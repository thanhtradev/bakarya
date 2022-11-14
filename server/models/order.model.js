const mongoose = require('mongoose');

const Order = mongoose.model(
    'Order',
    new mongoose.Schema({
        items: [{
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number,
        }],
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered'],
            default: 'pending',
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },

    }, {
        timestamps: true,
    })
);

module.exports = Order;