const mongoose = require("mongoose");

const ProductCategory = mongoose.model(
  "ProductCategory",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = ProductCategory;
