const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    thumbnail: String,
    stock: Number,
    productSubCategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSubCategory",
    }],
  }, {
    timestamps: true,
  })
);

module.exports = Product;