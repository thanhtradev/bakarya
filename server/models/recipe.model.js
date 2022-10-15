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
    thumbnail_url: String,
    video_url: String,
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecipeCategory",
    }],
    hashtag: [String],
  }, {
    timestamps: true
  })
);

module.exports = Recipe;