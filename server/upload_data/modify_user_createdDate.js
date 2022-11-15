require("dotenv").config({
    path: "../.env",
});
const fs = require('fs');
const db = require("../models");
const RECIPE = db.recipe;
const USER = db.user;
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
    // Find all user and update createdDate
    USER.find({}, (err, users) => {
        if (err) {
            console.log(err);
            return;
        }
        // Find user has no createdAt
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            // Delete avatar image
            if (user.avatar) {
                user.avatar = null;
                user.save().then(() => {
                    console.log("Deleted avatar image");
                });
            }
        }
    })
}