const db = require('../models');
const Product = db.product;
const ProductCategory = db.productCategory;

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
    recipe.save((err, product) => {
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