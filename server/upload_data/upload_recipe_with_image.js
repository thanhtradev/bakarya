const AWS = require('aws-sdk');
require("dotenv").config({
    path: "/home/thanhtra/FPT/SWP391/bakarya/server/.env",
});
const fs = require('fs');
const path = require('path');
const db = require("../models");
const RECIPE = db.recipe;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

db.mongoose
    .connect(process.env.ATLAS_URI, {
        // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial().then(() => {
            console.log("Successfully upload data to MongoDB.");
            process.exit(0);
        });
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

async function initial() {
    // Read recipe data from json file
    const rawDataPath =
        '/home/thanhtra/FPT/SWP391/bakarya/server/upload_data/recipes/upside-downcakes.json';
    let rawData = fs.readFileSync(rawDataPath);
    let recipes = JSON.parse(rawData);
    // Read image data from image folder
    const imageFolder = '/home/thanhtra/FPT/SWP391/crawler_python/';
    const directoryPath = path.join(imageFolder, 'images/');
    const files = fs.readdirSync(directoryPath);

    // Find recipe category
    let recipeCategory = await db.recipeCategory.find({
        name: recipes.category
    });
    category_id = recipeCategory[0]._id.toString();

    for (let i = 0; i < recipes.recipes.length; i++) {
        let recipe = recipes.recipes[i];
        // Check if recipe is empty
        if (Object.keys(recipe).length === 0) {
            console.log("Recipe is empty");
            continue;
        } else {
            // imageFilename = recipe.name.toString().toLowerCase().replace(/ /g, '_');
            imageFilename = recipe.name.toString().toLowerCase().replace(/ /g, '_') + '.jpg';
            // Check if image file exists
            if (files.includes(imageFilename)) {
                // Upload image to S3
                console.log("Uploading image to S3...");
                const fileContent = fs.readFileSync(directoryPath + imageFilename);
                const uploadedFile = await s3.upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: 'recipes/' + imageFilename,
                    Body: fileContent,
                }).promise();
                // Create new recipe
                let newRecipe = new RECIPE({
                    user_id: "634c5128bbfc6f6a863663df",
                    name: recipe.name,
                    expert: recipe.expert,
                    time: recipe.time,
                    makes: recipe.makes,
                    // Push image url to images
                    images: [uploadedFile.Location],
                    ingredients: recipe.ingredients,
                    directions: recipe.directions,
                    nutrition: recipe.nutrition,
                    categories: category_id,
                });
                newRecipe.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Recipe saved successfully");
                })
            } else {
                let newRecipe = new RECIPE({
                    user_id: "634c5128bbfc6f6a863663df",
                    name: recipe.name,
                    expert: recipe.expert,
                    time: recipe.time,
                    makes: recipe.makes,
                    // Push image url to images
                    images: ['https://bakarya.s3.ap-southeast-1.amazonaws.com/recipes/bakarya.jpg'],
                    ingredients: recipe.ingredients,
                    directions: recipe.directions,
                    nutrition: recipe.nutrition,
                    categories: category_id,
                });
                newRecipe.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Recipe saved successfully with default image");
                })
            }
        }

    }

    // const filename = '/home/thanhtra/FPT/SWP391/crawler_python/images/chocolate_layered_angel_food_cake.jpg';
    // const fileContent = fs.readFileSync(filename);
    // const uploadedFile = await s3.upload({
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: 'recipes/' + filename.split('/').pop(),
    //     Body: fileContent,
    // }).promise();
    // console.log(uploadedFile.Location);
}