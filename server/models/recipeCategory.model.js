const mongoose = require("mongoose");

const RecipeCategory = mongoose.model(
  "RecipeCategory",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = RecipeCategory;
