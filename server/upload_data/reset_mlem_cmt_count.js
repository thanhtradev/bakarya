require("dotenv").config({
    path: "/home/thanhtra/FPT/SWP391/bakarya/server/.env",
});
const fs = require('fs');
const db = require("../models");
const PRODUCT = db.product;
const PRODUCTSUBCATEGORY = db.productSubCategory;
const RECIPE = db.recipe;

db.mongoose
    .connect(process.env.ATLAS_URI, {
        // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function initial() {
    // reset all recipe mlem count and comment count to 0
    RECIPE.find({}, (err, recipes) => {
        if (err) {
            console.log(err);
            return;
        }
        recipes.forEach((recipe) => {
            recipe.number_of_mlems = 0;
            recipe.number_of_comments = 0;
            recipe.save((err, recipe) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (recipe) {
                    console.log("Recipe updated: ", recipe.name);
                }
            });
        });
    });
}