const db = require('../models');
const Recipe = db.recipe;
const RecipeCategory = db.recipeCategory;

// Create a new Recipe

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
            recipeList = recipes.map(recipe => {
                return {
                    id: recipe._id,
                    author: recipe.user_id.username,
                    name: recipe.name,
                    expert: recipe.expert,
                    time: recipe.time,
                    makes: recipe.makes,
                    ingredients: recipe.ingredients,
                    directions: recipe.directions,
                    nutrition: recipe.nutrition,
                    number_of_mlems: recipe.number_of_mlems,
                    number_of_comments: recipe.number_of_comments,
                    categories: recipe.categories.map(category => category.name),
                    createdAt: recipe.createdAt,
                }
            });
            res.status(200).send(recipeList);
        });
}

// Retrieve a single recipe with recipeId

exports.findOne = (req, res) => {
    const id = req.params.recipeId;

    Recipe.findById(id)
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
            res.send(recipe);
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
            recipeList = recipes.map(recipe => {
                return {
                    id: recipe._id,
                    author: recipe.user_id.username,
                    name: recipe.name,
                    expert: recipe.expert,
                    time: recipe.time,
                    makes: recipe.makes,
                    ingredients: recipe.ingredients,
                    directions: recipe.directions,
                    nutrition: recipe.nutrition,
                    number_of_mlems: recipe.number_of_mlems,
                    number_of_comments: recipe.number_of_comments,
                    categories: recipe.categories.map(category => category.name),
                    createdAt: recipe.createdAt,
                }
            });
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
            recipeList = recipes.map(recipe => {
                return {
                    id: recipe._id,
                    author: recipe.user_id.username,
                    name: recipe.name,
                    expert: recipe.expert,
                    time: recipe.time,
                    makes: recipe.makes,
                    ingredients: recipe.ingredients,
                    directions: recipe.directions,
                    nutrition: recipe.nutrition,
                    number_of_mlems: recipe.number_of_mlems,
                    number_of_comments: recipe.number_of_comments,
                    categories: recipe.categories.map(category => category.name),
                    createdAt: recipe.createdAt,
                }
            });
            res.status(200).send(recipeList);
        });
}