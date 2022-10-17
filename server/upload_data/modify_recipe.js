require("dotenv").config({
    path: "../.env",
});
const fs = require('fs');
const db = require("../models");
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
    // Find all recipe and update random number of mlems and comments
    RECIPE.find({}, (err, recipes) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            do {
                recipe.number_of_mlems = getRandomInt(0, 300);
                recipe.number_of_comments = getRandomInt(0, 200);
            } while (recipe.number_of_comments / recipe.number_of_mlems > 2);
            recipe.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Recipe update successfully");
            })
        }
    })
}