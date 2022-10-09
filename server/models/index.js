const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.recipeCategory = require("./recipeCategory.model");
db.recipe = require("./recipe.model");
db.product = require("./product.model");

db.ROLES = ["baker", "retail", "admin"];
db.RECIPECATEGORIES = [
  "Angel Food Cakes",
  "Apple Cakes",
  "Banana Cakes",
  "Birthday Cakes",
  "Bundt Cakes",
  "Cake Pops",
  "Cake Rolls",
  "Carrot Cakes",
  "Chocolate Cakes",
  "Coconut Cakes",
  "Fruitcakes",
  "German Chocolate Cakes",
  "Gingerbread",
  "Layer Cakes",
  "Lemon Cakes",
  "Poke Cakes",
  "Pound Cakes",
  "Pudding Cakes",
  "Red Velvet Cakes",
  "Rum Cakes",
  "Sheet Cakes",
  "Shortcakes",
  "Snack Cakes",
  "Sponge Cakes",
  "Tortes",
  "Upside-Down Cakes",
];

module.exports = db;