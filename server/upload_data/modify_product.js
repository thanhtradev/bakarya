require("dotenv").config({
    path: "../.env",
});
const fs = require('fs');
const db = require("../models");
const PRODUCT = db.product;
const PRODUCTSUBCATEGORY = db.productSubCategory;

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
    // Find all product and update
    PRODUCT.find({}, (err, products) => {
        if (err) {
            console.log(err);
            return;
        }
        products.forEach((product) => {
            product.price = [].push(product.price);
            product.save((err, product) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (product) {
                    console.log("Product updated: ", product.name);
                }
            });
        });
    });
}
initial();