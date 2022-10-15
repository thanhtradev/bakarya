const mongoose = require('mongoose');

const ProductSubCategory = mongoose.model(
    'ProductSubCategory',
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        productCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductCategory'
        }
    })
);

module.exports = ProductSubCategory;