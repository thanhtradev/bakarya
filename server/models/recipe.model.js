const mongoose = require("mongoose");

const Recipe =
  mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
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
    images: [{
      type: String
    }],
    video_url: String,
    number_of_mlems: {
      type: Number,
      default: 0
    },
    number_of_comments: {
      type: Number,
      default: 0
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecipeCategory",
    }],
    hashtags: [String],
    is_active: {
      type: Boolean,
      default: true
    },
  }, {
    timestamps: true
  });
module.exports = mongoose.model('Recipe', Recipe);