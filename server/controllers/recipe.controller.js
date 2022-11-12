const db = require('../models');
const Recipe = db.recipe;
const RecipeCategory = db.recipeCategory;
const Mlem = db.mlem;
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
// Create a new Recipe
/**
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Recipe
    const recipe = new Recipe({
        user_id: req.userId,
        name: req.body.name,
        expert: req.body.expert,
        time: req.body.time,
        makes: req.body.makes,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        nutrition: req.body.nutrition,
    });

    // Save Recipe in the database
    recipe.save((err, recipe) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Recipe."
            });
            return;
        }
        if (req.body.categories) {
            RecipeCategory.find({
                name: {
                    $in: req.body.categories
                }
            }, (err, categories) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Recipe."
                    });
                    return;
                }
                recipe.categories = categories.map(category => category._id);
                recipe.save((err) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Recipe."
                        });
                        return;
                    }
                    res.send({
                        message: "Recipe was created successfully!"
                    });
                });
            });
        }
    });
}
*/

exports.create = async (req, res) => {
    //Handle recipe
    // Parse json data from request
    const recipe = JSON.parse(req.body.recipe);
    // Validate request
    if (!recipe.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Recipe
    const newRecipe = new Recipe({
        user_id: req.userId,
        name: recipe.name,
        expert: recipe.expert,
        time: recipe.time,
        makes: recipe.makes,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        nutrition: recipe.nutrition,
    });

    //Handle file upload
    // imageUrl list
    let imageUrlList = [];
    // Check if there have any files
    if (req.files) {
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
        // Upload to aws s3
        for (let i = 0; i < req.files.length; i++) {
            const file = fs.readFileSync(path.join(__dirname, '../uploads/' + req.files[i].filename));
            const uploadedFile = await s3.upload({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: 'recipes/' + req.files[i].filename,
                Body: file,
            }).promise();
            imageUrlList.push(uploadedFile.Location);
        }
        newRecipe.images = imageUrlList;
    }

    // Save Recipe in the database
    newRecipe.save((err, savedRecipe) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Recipe."
            });
            return;
        }
        if (recipe.categories) {
            RecipeCategory.find({
                name: {
                    $in: recipe.categories
                }
            }, (err, categories) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Recipe."
                    });
                    return;
                }
                savedRecipe.categories = categories.map(category => category._id);
                // console.log(categories);
                savedRecipe.save((err, recipe) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Recipe."
                        });
                        return;
                    }
                    res.send({
                        message: "Recipe was created successfully!",
                    });
                });
            });
        }
    });

};

// Retrieve all recipes from the database.

exports.findAll = (req, res) => {
    Recipe.find()
        .populate('user_id')
        .populate('categories')
        .exec((err, recipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            recipeList = recipes.map(recipe => formatRecipeData(recipe));
            res.status(200).send(recipeList);
        });
}

// Retrieve a single recipe with recipeId

exports.findOne = (req, res) => {
    const id = req.params.recipeId;
    Recipe.findById(id)
        .populate('user_id')
        .populate('categories')
        .exec((err, recipe) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    res.status(404).send({
                        message: "Recipe not found with id " + id
                    });
                    return;
                }
                res.status(500).send({
                    message: "Error retrieving recipe with id " + id
                });
                return;
            }
            if (!recipe) {
                res.status(404).send({
                    message: "Recipe not found with id " + id
                });
                return;
            }
            res.status(200).send(formatRecipeData(recipe));
        });
}

exports.findTop10 = (req, res) => {
    Recipe.find()
        .sort({
            number_of_mlems: -1
        })
        .limit(10)
        .populate('user_id')
        .populate('categories')
        .exec((err, recipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            recipeList = recipes.map(recipe => formatRecipeData(recipe));
            res.status(200).send(recipeList);
        });
}
// Retrieve limited number of Recipes
exports.findLimited = (req, res) => {
    const limit = req.params.limit;
    Recipe.find()
        .sort({
            createdAt: -1
        })
        .limit(parseInt(limit))
        .populate('user_id')
        .populate('categories')
        .exec((err, recipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            recipeList = recipes.map(recipe => formatRecipeData(recipe));
            res.status(200).send(recipeList);
        });
}

// Retrieve recipes belonging to a user
exports.findAllByUser = (req, res) => {
    const id = req.userId;
    // Find recipe with user_id and sort by createdAtS
    Recipe.find({
            user_id: id
        })
        .populate('user_id')
        .populate('categories')
        .sort({
            createdAt: -1
        })
        .exec((err, recipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            recipeList = recipes.map(recipe => formatRecipeData(recipe));
            res.status(200).send(recipeList);
        });
}

const ContentBasedRecommender = require('content-based-recommender')
const recommender = new ContentBasedRecommender({
    minScore: 0.1,
    maxSimilarDocuments: 2000
});


// Retrieve suggested recipes
exports.findSuggestions = (req, res) => {
    // Find recent recipes which user has mlemmed
    const id = req.userId;
    Mlem.find({
            user_id: id
        })
        .sort({
            createdAt: -1
        })
        .limit(1)
        .exec((err, mlems) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            // Get recipe 
            var recipeId = mlems[0].recipe_id._id.toString();
            // Get all recipe
            Recipe.find().limit(20).exec((err, recipes) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving recipes."
                    });
                    return;
                }
                var recipeDataTraining = recipes.map(recipe => {
                    return {
                        id: recipe._id.toString(),
                        content: recipe.expert + " " + recipe.time + " " + recipe.makes + " " + recipe.ingredients + " " + recipe.directions + " " + recipe.nutrition,
                    }
                });
                // Add all recipes to recommender
                recommender.train(recipeDataTraining);
                // Check if recipeId is undefined, if undefined get random recipe
                if (recipeId == undefined) {
                    var randomRecipe = recipeDataTraining[Math.floor(Math.random() * recipeDataTraining.length)];
                    recipeId = randomRecipe.id;
                }
                // Get suggestions
                var suggestions = recommender.getSimilarDocuments(recipeId, 0, 15);
                // Get recipe ids   
                var recipeIds = suggestions.map(suggestion => suggestion.id);
                // Find recipes
                Recipe.find({
                        _id: {
                            $in: recipeIds
                        }
                    })
                    .populate('user_id')
                    .populate('categories')
                    .exec((err, recipes) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message || "Some error occurred while retrieving recipes."
                            });
                            return;
                        }
                        var recipeList = recipes.map(recipe => formatRecipeData(recipe));
                        res.send(recipeList);
                    });
            });
        });
};

// Search recipes by category
exports.findByCategory = (req, res) => {
    const category = req.params.category;
    // Find category similar to category
    RecipeCategory.find({
        name: {
            $regex: category,
            $options: 'i'
        }
    }).exec((err, categories) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes."
            });
            return;
        }
        // Get category ids
        var categoryIds = categories.map(category => category._id);
        // Find recipes with category ids
        Recipe.find({
            categories: {
                $in: categoryIds
            }
        }).populate('user_id').populate('categories').exec((err, recipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            var recipeList = recipes.map(recipe => formatRecipeData(recipe));
            res.send(recipeList);
        });
    })

}
//Get random 15 recipe
exports.findRandom = (req, res) => {
    // Get the count of all users
    Recipe.count().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)

        // Again query all users but only fetch one offset by our random #
        Recipe.find().skip(random).limit(15).populate('user_id').populate('categories').exec((err, recipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            var recipeList = recipes.map(recipe => formatRecipeData(recipe));
            res.send(recipeList);
        })
    })
}


// Format recipe data
function formatRecipeData(recipe) {
    return {
        id: recipe._id,
        author: recipe.user_id.username,
        author_id: recipe.user_id._id,
        author_avatar: recipe.user_id.avatar_url,
        name: recipe.name,
        expert: recipe.expert,
        time: recipe.time,
        makes: recipe.makes,
        images: recipe.images,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        nutrition: recipe.nutrition,
        number_of_mlems: recipe.number_of_mlems,
        number_of_comments: recipe.number_of_comments,
        categories: recipe.categories.map(category => category.name),
        createdAt: recipe.createdAt,
    }
}