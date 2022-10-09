const { Timestamp, Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: String,
      unit_price: Double,
      description: String,
      thumbnail: String,
      units_stock: Int32,
      product_categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductCategory",
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Product;
