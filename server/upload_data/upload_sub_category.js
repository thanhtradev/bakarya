require("dotenv").config({
    path: "/home/thanhtra/FPT/SWP391/bakarya/server/.env",
});
const fs = require('fs');
const db = require("../models");
const ProductCategory = require("../models/productCategory.model");
const PRODUCTCATEGORY = db.productCategory;
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

function initial() {
    let productCategoryID;
    ProductCategory.findOne({
            name: "Presentation & Storage"
        },
        (err, productCategory) => {
            if (err) {
                console.log(err)
                return;
            }
            productCategoryID = productCategory._id;
            let rawData = fs.readFileSync('./products/presentation-storage.json');
            let ingredients = JSON.parse(rawData);
            for (let i = 0; i < ingredients.length; i++) {
                let subCate = ingredients[i];
                console.log(subCate.subCategoryName);
                let newSubCate = new PRODUCTSUBCATEGORY({
                    name: subCate.subCategoryName,
                    productCategory: productCategoryID,
                });
                newSubCate.save((err, subCate) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("added " + subCate.name);
                });
            }
        },
    )


}