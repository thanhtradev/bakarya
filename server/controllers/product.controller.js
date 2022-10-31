const db = require('../models');
const Product = db.product;
const ProductCategory = db.productCategory;
const ProductSubCategory = db.productSubCategory;
//Create a new Product
exports.create = (req, res) => {

    //Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a product
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        stock: req.body.stock,
    });

    // Save product in the database
    product.save((err, product) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
            return;
        }
        if (req.body.product_categories) {
            ProductCategory.find({
                name: {
                    $in: req.body.product_categories
                }
            }, (err, product_categories) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the product."
                    });
                    return;
                }
                product.product_categories = product_categories.map(category => category._id);
                product.save((err) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the product."
                        });
                        return;
                    }
                    res.send({
                        message: "Product was created successfully!"
                    });
                });
            });
        }
    });
}

// Retrieve all products from the database.

exports.findAll = (req, res) => {
    Product.find()
        .populate('product_categories')
        .exec((err, products) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving products."
                });
                return;
            }
            res.send(products);
        });
}

// Retrieve a single product with productId

exports.findOne = (req, res) => {
    const id = req.params.productId;

    Product.findById(id)
        .populate('product_categories')
        .exec((err, product) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    res.status(404).send({
                        message: "Product not found with id " + id
                    });
                    return;
                }
                res.status(500).send({
                    message: "Error retrieving product with id " + id
                });
                return;
            }
            res.send(product);
        });
}

// Retrieve product with specific category
exports.findByCategory = (req, res) => {
    const category = req.params.category;
    // If category is productCategory, then find all subcategories of category
    ProductCategory.findOne({
        name: category
    }).exec((err, productCategory) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
            return;
        }
        if (!productCategory) {
            // Find subcategories of category
            ProductSubCategory.findOne({
                name: category
            }).exec((err, productSubCategories) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving products."
                    });
                    return;
                }
                if (!productSubCategories) {
                    res.status(404).send({
                        message: "Product not found with category " + category
                    });
                    return;
                }
                // Find products with subcategory
                Product.find({
                    product_categories: productSubCategories._id
                }).populate('product_categories').exec((err, products) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while retrieving products."
                        });
                        return;
                    }
                    res.send(products);
                });
            });
        } else {
            // Find all subcategories of category
            ProductSubCategory.find({
                productCategory: productCategory._id
            }).exec((err, productSubCategories) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving products."
                    });
                    return;
                }
                if (productSubCategories.length === 0) {
                    res.status(404).send({
                        message: "Product not found with category " + category
                    });
                    return;
                }
                // Find all product with each subcategory
                Product.find({
                    product_categories: {
                        $in: productSubCategories.map(subCategory => subCategory._id)
                    }
                }).populate('product_categories').exec((err, products) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while retrieving products."
                        });
                        return;
                    }
                    res.send(products);
                });
            });
        }
    });
}