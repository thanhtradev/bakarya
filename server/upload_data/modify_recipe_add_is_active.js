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
    // Find all recipe and update is_active
    RECIPE.find({}, (err, recipes) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < recipes.length; i++) {
            let recipe = recipes[i];
            recipe.is_active = true;
            recipe.save((err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`Recipe ${i}/${recipes.length} update successfully`);
            })
        }
    })
}