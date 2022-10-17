const db = require("../models");
const Mlem = db.mlem;
const Recipe = db.recipe;
const User = db.user;

// Create and Save a new Mlem
exports.mlem = (req, res) => {
    // Validate request
    if (!req.body.recipeid || !req.body.userid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Mlem
    const mlem = new Mlem({
        recipe_id: req.body.recipeid,
        user_id: req.body.userid,
    });

    // Check if user exists
    User.findById(req.body.userid)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find User with id ${req.body.userid}.`
                });
            } else {
                mlem.user_id = data._id;
                // Check if recipe exists
                Recipe.findById(req.body.recipeid)
                    .then(recipe => {
                        if (!recipe) {
                            res.status(404).send({
                                message: `Cannot find User with id ${req.body.userid}.`
                            });
                        } else {
                            mlem.recipe_id = recipe._id;

                            // Update recipe mlem count
                            recipe.number_of_mlems = recipe.number_of_mlems + 1;
                            recipe.save((err) => {
                                if (err) {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while updating the Recipe."
                                    });
                                }
                            });

                            // Check if mlem exists
                            Mlem.findOne({
                                recipe_id: req.body.recipeid,
                                user_id: req.body.userid
                            }).exec((err, _mlem) => {
                                if (err) {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while creating the Mlem."
                                    });
                                    return;
                                }
                                if (_mlem) {
                                    // Update mlem
                                    Mlem.findByIdAndUpdate(_mlem._id, {
                                        mlem: true
                                    }, {
                                        useFindAndModify: false
                                    }).exec((err, mlem) => {
                                        if (err) {
                                            res.status(500).send({
                                                message: err.message || "Some error occurred while creating the Mlem."
                                            });
                                            return;
                                        }
                                        // Success
                                        res.send({
                                            message: "Mlem updated successfully!",
                                        })
                                    });
                                } else {
                                    // Save Mlem in the database
                                    mlem.save((err) => {
                                        if (err) {
                                            res.status(500).send({
                                                message: err.message || "Some error occurred while creating the Mlem."
                                            });
                                        }
                                        // Success
                                        res.send({
                                            message: "Mlem created successfully!",
                                        })
                                    });

                                }
                            });
                        }
                    })
                    .catch(_ => {
                        res.status(500).send({
                            message: `Error retrieving User with id  ${req.body.userid}`
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Recipe with id  ${req.body.recipeid}`
            });
        });
}

// Unmlem a Mlem with mlemID and check recipeId and userId
exports.unmlem = (req, res) => {
    // Validate request
    if (!req.body.recipeid || !req.body.userid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Find and update mlem with mlemid, recipe_id and user_id
    Mlem.findOneAndUpdate({
        recipe_id: req.body.recipeid,
        user_id: req.body.userid
    }, {
        mlem: false
    }, {
        useFindAndModify: false
    }).exec((err, mlem) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the Mlem."
            });
            return;
        }
        if (!mlem) {
            res.status(404).send({
                message: `Cannot find Mlem with recipe_id ${req.body.recipeid} and user_id ${req.body.userid}.`
            });
        } else {
            // Update recipe mlem count
            Recipe.findById(req.body.recipeid).exec((err, recipe) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the Recipe."
                    });
                    return;
                }
                if (!recipe) {
                    res.status(404).send({
                        message: `Cannot find Recipe with id ${req.body.recipeid}.`
                    });
                } else {
                    // Update recipe mlem count 
                    // Set to 0 if number_of_mlems is less than 0
                    recipe.number_of_mlems = recipe.number_of_mlems > 0 ? recipe.number_of_mlems - 1 : 0;
                    recipe.save((err) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message || "Some error occurred while updating the Recipe."
                            });
                        }
                    });
                }
            });
            // Success
            res.send({
                message: "Unmlem successfully!",
            })
        }
    });


    // // Check if mlem exists
    // Mlem.findById(req.body.mlemid).exec((err, mlem) => {
    //     if (err) {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while retrieving the Mlem."
    //         });
    //         return;
    //     }
    //     if (!mlem) {
    //         res.status(404).send({
    //             message: `Cannot find Mlem with id ${req.body.mlemid}.`
    //         });
    //         return;
    //     }
    //     // Check if user exists
    //     User.findById(req.body.userid).exec((err, user) => {
    //         if (err) {
    //             res.status(500).send({
    //                 message: err.message || "Some error occurred while retrieving the User."
    //             });
    //             return;
    //         }
    //         if (!user) {
    //             res.status(404).send({
    //                 message: `Cannot find User with id ${req.body.recipeid}.`
    //             });
    //             return;
    //         }
    //         // Check if recipe exists
    //         Recipe.findById(req.body.recipeid).exec((err, recipe) => {
    //             if (err) {
    //                 res.status(500).send({
    //                     message: err.message || "Some error occurred while retrieving the Recipe."
    //                 });
    //                 return;
    //             }
    //             if (!user) {
    //                 res.status(404).send({
    //                     message: `Cannot find Recipe with id ${req.body.userid}.`
    //                 });
    //                 return;
    //             }

    //             // Update recipe mlem count and save
    //             // If mlem count is 0, set to 0

    //             recipe.number_of_mlems = recipe.number_of_mlems > 0 ? recipe.number_of_mlems - 1 : 0;
    //             recipe.save((err) => {
    //                 if (err) {
    //                     res.status(500).send({
    //                         message: err.message || "Some error occurred while updating the Recipe."
    //                     });
    //                 }
    //             });
    //             // Update Mlem in the database
    //             Mlem.findByIdAndUpdate(req.body.mlemid, {
    //                 mlem: false
    //             }, {
    //                 useFindAndModify: false
    //             }).exec((err) => {
    //                 if (err) {
    //                     res.status(500).send({
    //                         message: err.message || "Some error occurred while updating the Mlem."
    //                     });
    //                     return;
    //                 }
    //                 // Success
    //                 res.send({
    //                     message: "Unmlem successfully!",
    //                 })
    //             });
    //         });
    //     })
    // })
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