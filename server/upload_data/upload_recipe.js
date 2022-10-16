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
    let rawData = fs.readFileSync('./recipes/angelfoodcakes.json');
    let recipes = JSON.parse(rawData);
    for (let i = 0; i < recipes.recipes.length; i++) {
        let recipe = recipes.recipes[i];
        let newRecipe = new RECIPE({
            user_id: "634c5128bbfc6f6a863663df",
            name: recipe.name,
            expert: recipe.expert,
            time: recipe.time,
            makes: recipe.makes,
            ingredients: recipe.ingredients,
            directions: recipe.directions,
            nutrition: recipe.nutrition,
            categories: "6333201dc554f03bc93c56e1",
        });
        newRecipe.save((err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Recipe saved successfully");
        })
    }


    // for (let i = 0; i < ingredients.length; i++) {
    //     let subCate = ingredients[i];
    //     PRODUCTSUBCATEGORY.findOne({
    //             name: subCate.subCategoryName
    //         },
    //         (err, productSubCategory) => {
    //             if (err) {
    //                 console.log(err)
    //                 return;
    //             }
    //             if (productSubCategory) {
    //                 products = subCate.products;
    //                 for (let j = 0; j < subCate.products.length; j++) {
    //                     let product = subCate.products[j];
    //                     let newProduct = new PRODUCT({
    //                         name: product.productName,
    //                         price: [parseInt(product.productPrice)],
    //                         description: product.productDescription,
    //                         thumbnail: product.productImage,
    //                         product_categories: [productSubCategory._id],
    //                         stock: getRandomInt(0, 1000),
    //                     });
    //                     newProduct.save((err, product) => {
    //                         if (err) {
    //                             console.log(err);
    //                             return;
    //                         }
    //                         console.log("added " + product.name);
    //                     });
    //                 }
    //             }
    //         }
    //     )
    // }
}