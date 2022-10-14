require("dotenv").config({
    path: "/home/thanhtra/FPT/SWP391/bakarya/server/.env",
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
    let rawData = fs.readFileSync('./products/equipment.json');
    let ingredients = JSON.parse(rawData);
    for (let i = 0; i < ingredients.length; i++) {
        let subCate = ingredients[i];
        console.log(subCate.subCategoryName);
        PRODUCTSUBCATEGORY.findOne({
                name: subCate.subCategoryName
            },
            (err, productSubCategory) => {
                if (err) {
                    console.log(err)
                    return;
                }
                let productSubCategoryID = productSubCategory._id;
                product = subCate.products;
                for (let j = 0; j < subCate.products.length; j++) {
                    let product = subCate.products[j];
                    let newProduct = new PRODUCT({
                        name: product.productName,
                        price: parseInt(product.productPrice),
                        description: product.productDescription,
                        thumbnail: product.productImage,
                        product_categories: productSubCategoryID,
                        stock: getRandomInt(0, 1000),
                    });
                    newProduct.save((err, product) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log("added " + product.name);
                    });
                }
            }
        )
    }
}
initial();