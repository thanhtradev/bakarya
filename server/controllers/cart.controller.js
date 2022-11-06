const {
    user,
    cart
} = require('../models');
const db = require('../models');
const Cart = db.cart;
const Product = db.product;
const User = db.user;

//Create a new Cart
exports.create = (req, res) => {
    //Validate request
    if (!req.body.productid || !req.body.quantity) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Validate quantity is a number
    if (isNaN(req.body.quantity)) {
        res.status(400).send({
            message: "Quantity must be a number!"
        });
        return;
    } else {
        // Convert quantity to a number
        req.body.quantity = Number(req.body.quantity);
    }

    // Check if the product exists
    Product.findById(req.body.productid).exec((err, product) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving product by id " + req.body.productid
            });
            return;
        }
        if (!product) {
            res.status(404).send({
                message: "Product not found"
            });
            return;
        }
        // Check if user has already a cart
        Cart.findOne({
            user_id: req.userId
        }).exec((err, cart) => {
            if (err) {
                res.status(500).send({
                    message: "Error retrieving cart by user id " + req.userId
                });
                return;
            }
            if (!cart) {
                // Check if product is in stock
                if (product.stock < req.body.quantity) {
                    res.status(400).send({
                        message: "Not enough stock"
                    });
                    return;
                }
                // Create a new cart
                const cart = new Cart({
                    items: [{
                        product_id: req.body.productid,
                        quantity: req.body.quantity,
                    }],
                    user_id: req.userId
                });
                // Save cart in the database
                cart.save(cart).then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the cart."
                    });
                });
            } else {
                // Check if the product is already in the cart
                const item = cart.items.find(item => item.product_id == req.body.productid);
                if (item) {
                    // Check if product is in stock
                    if (product.stock < item.quantity + req.body.quantity) {
                        res.status(400).send({
                            message: "Not enough stock"
                        });
                        return;
                    }
                    // Update the quantity
                    item.quantity += req.body.quantity;
                } else {
                    // Check if product is in stock
                    if (product.stock < req.body.quantity) {
                        res.status(400).send({
                            message: "Not enough stock"
                        });
                        return;
                    }
                    // Add the product to the cart
                    cart.items.push({
                        product_id: req.body.productid,
                        quantity: req.body.quantity,
                    });
                }
                // Save cart in the database
                cart.save(cart).then(data => {
                    res.status(200).send({
                        message: "Cart updated successfully"
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the cart."
                    });
                });
            }
        });
    });
}

// Retrieve a cart by userId

exports.findCart = (req, res) => {
    const id = req.userId;
    // Find cart by user id
    Cart.findOne({
            user_id: id
        })
        .populate({
            path: 'items',
            populate: {
                path: 'product_id',
                model: 'Product'
            }
        })
        .populate({
            path: 'items',
            populate: {
                path: 'product_id',
                populate: {
                    path: 'product_categories',
                    model: 'ProductSubCategory'
                }
            }
        })
        .exec((err, cart) => {
            if (err) {
                res.status(500).send({
                    message: "Error retrieving cart by user id " + id
                });
                return;
            }
            if (!cart) {
                // Create a new empty cart
                const cart = new Cart({
                    items: [],
                    user_id: id
                });
                // Save cart in the database
                cart.save(cart).then(data => {
                    const response = {
                        productCount: data.items.length,
                        items: data.items.map(item => {
                            return {
                                product: {
                                    id: item.product_id._id,
                                    name: item.product_id.name,
                                    price: item.product_id.price.slice(-2),
                                    description: item.product_id.description,
                                    stock: item.product_id.stock,
                                    categories: item.product_id.product_categories.map(category => category.name),
                                },
                                // Check if the product is in stock
                                inStock: item.product_id.stock >= item.quantity,
                                quantity: item.quantity
                            }
                        })
                    }
                    res.send(response);
                    // res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the cart."
                    });
                });
            } else {
                // Format the response
                const response = {
                    productCount: cart.items.length,
                    items: cart.items.map(item => {
                        return {
                            product: {
                                id: item.product_id._id,
                                name: item.product_id.name,
                                price: item.product_id.price.slice(-2),
                                description: item.product_id.description,
                                stock: item.product_id.stock,
                                categories: item.product_id.product_categories.map(category => category.name),
                            },
                            // Check if the product is in stock
                            inStock: item.product_id.stock >= item.quantity,
                            quantity: item.quantity
                        }
                    })
                }
                res.send(response);
            }
        });
}

exports.update = (req, res) => {
    // Validate request
    if (!req.body.quantity || !req.body.productid) {
        res.status(400).send({
            message: "Quantity can not be empty!"
        });
        return;
    }
    if (isNaN(req.body.quantity)) {
        res.status(400).send({
            message: "Quantity must be a number!"
        });
        return;
    } else {
        // Convert quantity to a number
        req.body.quantity = Number(req.body.quantity);
    }

    // Find cart by user id
    Cart.findOne({
            user_id: req.userId
        })
        .populate({
            path: 'items',
            populate: {
                path: 'product_id',
                model: 'Product'
            }
        })
        .exec((err, cart) => {
            if (err) {
                res.status(500).send({
                    message: "Error retrieving cart by user id " + req.userId
                });
                return;
            }
            if (!cart) {
                res.status(404).send({
                    message: "Cart not found please add a product to the cart first"
                });
                return;
            }
            // Check if the product is in the cart
            const item = cart.items.find(item => item.product_id._id == req.body.productid);
            if (!item) {
                res.status(404).send({
                    message: "Product not found in cart"
                });
                return;
            }
            // Check if product is in stock
            if (item.product_id.stock < req.body.quantity) {
                res.status(400).send({
                    message: "Not enough stock"
                });
                return;
            }
            // Update the quantity
            item.quantity = req.body.quantity;
            // Save cart in the database
            cart.save(cart).then(data => {
                res.status(200).send({
                    message: "Cart updated successfully"
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating the cart."
                });
            });
        });
}

exports.delete = (req, res) => {
    // Validate request
    if (!req.body.productid) {
        res.status(400).send({
            message: "Product id can not be empty!"
        });
        return;
    }
    // Find cart by user id
    Cart.findOne({
        user_id: req.userId
    }).exec((err, cart) => {
        if (err) {
            res.status(500).send({
                message: "Error retrieving cart by user id " + req.userId
            });
            return;
        }
        if (!cart) {
            res.status(404).send({
                message: "Cart not found please add a product to the cart first"
            });
            return;
        }
        // Check if the product is in the cart
        const item = cart.items.find(item => item.product_id == req.body.productid);
        if (!item) {
            res.status(404).send({
                message: "Product not found in cart"
            });
            return;
        }
        // Remove the product from the cart
        cart.items.pull(item);
        // Save cart in the database
        cart.save(cart).then(data => {
            res.status(200).send({
                message: "Cart updated successfully"
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the cart."
            });
        });
    });

}