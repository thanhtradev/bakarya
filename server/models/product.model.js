const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
<<<<<<< HEAD
  new mongoose.Schema(
    {
      name: String,
      unit_price: Number,
      description: String,
      thumbnail: String,
      units_stock: Number,
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
=======
  new mongoose.Schema({
    name: String,
    unit_price: Number,
    description: String,
    thumbnail: String,
    units_stock: Number,
    product_categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    }, ],
  }, {
    timestamps: true,
  })
>>>>>>> d561dd4bf163ea208cf7e85236281d0235168005
);

module.exports = Product;