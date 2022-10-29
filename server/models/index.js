const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.recipeCategory = require("./recipeCategory.model");
db.recipe = require("./recipe.model");
db.product = require("./product.model");
db.productCategory = require("./productCategory.model");
db.cart = require("./cart.model");
db.productSubCategory = require("./productSubCategory.model");
db.comment = require("./comment.model");
db.mlem = require("./mlem.model");

//This is for test
db.qa = require("./qa.model");


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
db.PRODUCTCATEGORIES = [
  'Ingredients & Edibles',
  'Equipment',
  'Presentation & Storage',
  'Decorations',
]

module.exports = db;