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
    // if (!req.body.name) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a new Cart
    const cart = new Cart({
        items: [{
            productId: req.body.productId,
            quantity: req.body.quantity,
        }],
        userId: req.body.userId
    });

    // Save cart info to db
    cart.save((err, cart) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating cart."
            })
            return;
        }
        if (req.body.userId) {
            User.find({
                userId: {
                    $in: req.body.userId
                }
            }, (err, user) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the cart."
                    });
                    return;
                }
                cart.userId = user._id;
                cart.save((err) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the cart."
                        });
                        return;
                    }
                    res.send({
                        message: "Cart was created successfully!"
                    });
                });
            });
        }
    });
}

// Retrieve a cart by userId

exports.findCart = (req, res) => {
    const id = req.params.userId;

    Cart.findById(id)
        .populate('userId')
        .exec((err, cart) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    res.status(404).send({
                        message: "Card not found with id " + id
                    });
                    return;
                }
                res.status(500).send({
                    message: "Error retrieving cart by id " + id
                });
                return;
            }
            res.send(cart);
        });
}