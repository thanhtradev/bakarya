const db = require("../models");
const Cart = db.cart;
const Product = db.product;
const Order = db.order;
// Create order
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.items) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Get items {product_id, quantity} from req.body
    const items = req.body.items;
    var orderItems = [];
    // Get current price of each product
    await Promise.all(items.map(async (item) => {
        await Product.findById(item.productid)
            .then(product => {
                orderItems.push({
                    product_id: item.productid,
                    // Get the last item in the price array
                    price: product.price[product.price.length - 1],
                    quantity: item.quantity,
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving products."
                });
            });
    }));

    // Create order
    const order = new Order({
        items: orderItems,
        user_id: req.userId,
        address: req.body.address,
        phone: req.body.phone,
    });
    console.log(order);
    Cart.findOne({
        user_id: req.userId
    }).exec((err, cart) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        orderItems.forEach(orderItem => {
            let index = cart.items.map(item => item.product_id.toString()).indexOf(orderItem.product_id);
            if (index > -1) {
                cart.items.splice(index, 1);
            }
        })
        order.save(err, order => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }
            if (order) {
                cart.save((err, cart) => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                        return;
                    }
                    res.send({
                        message: "Order created successfully!"
                    });
                });
            }
        });
    })
};

// Get order 
exports.findOne = (req, res) => {
    // Get order by user id
    Order.findOne({
        user_id: req.userId
    }).exec((err, order) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        if (!order) {
            return res.status(404).send({
                message: "Order not found!"
            });
        }
        res.send(order);
    });
}