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
        .populate('categories')
        .exec((err, recipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            res.send(recipes);
        });
}