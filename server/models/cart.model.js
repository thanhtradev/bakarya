const {
  MongoTopologyClosedError
} = require("mongodb");
const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    items: [{
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number,
    }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    }
  }, {
    timestamps: true,
  })
);

module.exports = Cart;