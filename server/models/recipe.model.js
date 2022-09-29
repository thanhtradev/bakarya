const mongoose = require("mongoose");

const Recipe = mongoose.model(
  "Recipe",
  new mongoose.Schema({
    name: String,
    description: String,
    ingredients: String,
    instructions: String,
    image: String,
    published: Boolean,
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RecipeCategory",
      },
    ],
  })
);

module.exports = Recipe;
