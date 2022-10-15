const db = require('../models');
const Comment = db.comment;
const Recipe = db.recipe;
const User = db.user;

// Create and Save a new Comment

exports.create = (req, res) => {
    // Validate request
    if (!req.body.comment) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Comment
    const comment = new Comment({
        // recipe_id: req.body.recipeid,
        // user_id: req.body.userid,
        comment: req.body.comment,
    });

    // Check if recipe exists
    Recipe.findById(req.body.recipeid)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find Recipe with id ${req.body.recipeid}.`
                });
            } else {
                comment.recipe_id = data._id;
                // Check if user exists
                User.findById(req.body.userid)

                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot find User with id ${req.body.userid}.`
                            });
                        } else {
                            comment.user_id = data._id;
                            // Save Comment in the database
                            comment.save((err) => {
                                if (err) {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while creating the Comment."
                                    });
                                }
                                // Success
                                res.send({
                                    message: "Comment created successfully!",
                                })

                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: `Error retrieving User with id  ${req.body.userid}`
                        });
                    });
            }
        })
        .catch(_ => {
            res.status(500).send({
                message: "Error retrieving Recipe with id=" + req.body.recipeid
            });
        });

};

// Retrieve all Comments from the database.
exports.findAll = (req, res) => {
    Comment.find({})
        .populate('recipe_id')
        .populate('user_id')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });
};

// Retrieve all Comments with recipeId from the database.
exports.findAllWithRecipeId = (req, res) => {
    Comment.find({
            recipe_id: req.params.recipeId
        })
        // .populate('recipe_id')
        .populate('user_id')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });
}