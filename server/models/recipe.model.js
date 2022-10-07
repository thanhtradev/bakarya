const mongoose = require("mongoose");

const Recipe = mongoose.model(
  "Recipe",
  new mongoose.Schema({
    name: String,
    expert: String,
    time: String,
    makes: String,
    ingredients: [{
      type: String
    }],
    directions: [{
      type: String
    }],
    nutrition: String,
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecipeCategory",
    }, ],
  }, {
    timestamps: true
  })
);

module.exports = Recipe;