const db = require("../models");
const Mlem = db.mlem;
const Recipe = db.recipe;
const User = db.user;

// Create and Save a new Mlem
exports.mlem = (req, res) => {
    // Validate request
    if (!req.body.recipeid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Check if recipe exists
    Recipe.findById(req.body.recipeid).exec((err, recipe) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Mlem."
            });
            return;
        }
        if (!recipe) {
            res.status(404).send({
                message: "Recipe not found."
            });
            return;
        }
        // Check if mlem already exists
        Mlem.findOne({
            recipe_id: req.body.recipeid,
            user_id: req.userId,
        }).exec((err, mlem) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Mlem."
                });
                return;
            }
            if (mlem) {
                if (mlem.mlem === true) {
                    res.status(400).send({
                        message: "You are already mlem this recipe."
                    });
                    return;
                } else {
                    // Update mlem to true
                    mlem.mlem = true;
                    mlem.save((err) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Mlem."
                            });
                            return;
                        }
                        // Update mlem count of recipe
                        recipe.number_of_mlems += 1;
                        console.log(recipe.number_of_mlems);
                        recipe.save((err) => {
                            if (err) {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while creating the Mlem."
                                });
                                return;
                            }
                            res.send({
                                message: "Mlem this recipe successfully!"
                            });
                        });
                    });
                }
            } else {
                // If mlem does not exist, create a new mlem
                // Create a Mlem
                const tmpMlem = new Mlem({
                    recipe_id: req.body.recipeid,
                    user_id: req.userId,
                });
                // Save Mlem in the database
                tmpMlem.save((err) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Mlem."
                        });
                        return;
                    }
                    res.send({
                        message: "Mlem this recipe successfully!"
                    });
                });
            }
        });
    });
}

// Unmlem a Mlem with recipeId and userId
exports.unmlem = (req, res) => {
    // Validate request
    if (!req.body.recipeid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    // Check if recipe exists
    Recipe.findById(req.body.recipeid).exec((err, recipe) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Mlem."
            });
            return;
        }
        if (!recipe) {
            res.status(404).send({
                message: "Recipe not found."
            });
            return;
        }

        // Find mlem with recipe_id and user_id
        Mlem.findOne({
            recipe_id: req.body.recipeid,
            user_id: req.userId,
        }).exec((err, mlem) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Mlem."
                });
                return;
            }
            if (!mlem || mlem.mlem === false) {
                res.status(404).send({
                    message: "You haven't mlemmed this recipe yet ."
                });
                return;
            } else {
                // Update mlem to false
                mlem.mlem = false;
                mlem.save((err) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Mlem."
                        });
                        return;
                    }
                    // Update mlem count of recipe
                    recipe.number_of_mlems -= 1;
                    recipe.save((err) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Mlem."
                            });
                            return;
                        }
                        res.send({
                            message: "Unmlem this recipe successfully!"
                        });
                    });

                });
            }
        });
    });
}

exports.findAllWithRecipeId = (req, res) => {
    const recipeid = req.params.recipeId;

    // Find all mlems with recipe_id and mlem = true

    Mlem.find({
            recipe_id: recipeid,
            mlem: true
        }).populate('user_id')
        .then(mlems => {
            // Return list of mlemers
            mlemers = [];
            mlems.forEach(mlem => {
                mlemers.push({
                    username: mlem.user_id.username,
                    mlemDate: mlem.createdAt
                });
            });
            return res.send(mlemers);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Mlems."
            });
        });
}

// Check if user has mlemmed a recipe
exports.checkIfMlemmed = (req, res) => {
    // Get recipe id and check if mlem exists
    const recipeid = req.body.recipeid;
    Mlem.findOne({
        recipe_id: recipeid,
        user_id: req.userId,
    }).exec((err, mlem) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Mlem."
            });
            return;
        }
        if (!mlem) {
            res.send({
                mlemmed: false
            });
        } else {
            res.send({
                mlemmed: mlem.mlem
            });
        }
    });
}