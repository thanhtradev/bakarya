const { MongoTopologyClosedError } = require("mongodb");
const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema(
    {
      items: [
        {
          productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product" },
          quantity: Number,
        }],
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Cart;
