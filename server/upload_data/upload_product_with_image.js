require("dotenv").config({
    path: "../.env",
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

    PRODUCT.find({}, (err, products) => {
        if (err) {
            console.log(err);
            return;
        }
        let count = 0;
        products.forEach((product) => {
            // check if thumbnail not include "bakarya.s3.amazonaws"
            if (!product.thumbnail.includes("bakarya")) {
                delete product
                product.delete((err, product) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (product) {
                        console.log("Product deleted: ", product.name);
                    }
                });
                console.log("Product not found: ", product.name);
                count++;
            }
            console.log("Total deleted product found: ", count);

        });
    });


}