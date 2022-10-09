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
        unit_price: req.body.unit_price,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        units_stock: req.body.units_stock,
    });

    // Save product in the database
    recipe.save((err, recipe) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the product."
            });
            return;
        }
        if (req.body.categories) {
            ProductCategory.find({
                name: {
                    $in: req.body.categories
                }
            }, (err, categories) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the product."
                    });
                    return;
                }
                product.categories = categories.map(category => category._id);
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
        .populate('categories')
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
        .populate('categories')
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