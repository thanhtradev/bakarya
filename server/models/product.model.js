const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    unit_price: Number,
    description: String,
    thumbnail: String,
    units_stock: Number,
    product_categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    }],
  }, {
    timestamps: true,
  })
);

module.exports = Product;