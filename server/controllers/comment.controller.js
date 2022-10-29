const {
    comment
} = require('../models');
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
        user_id: req.userId,
        comment: req.body.comment,
    });

    // Check if recipe exists
    Recipe.findById(req.body.recipeid)
        .then(recipe => {
            if (!recipe) {
                res.status(404).send({
                    message: `Cannot find Recipe with id ${req.body.recipeid}.`
                });
            } else {
                comment.recipe_id = recipe._id;
                // Save Comment in the database
                comment.save((err) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Comment."
                        });
                    }
                    // Update number comments of recipe
                    recipe.number_of_comments = recipe.number_of_comments + 1;
                    recipe.save((err) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message || "Some error occurred while updating the Recipe."
                            });
                        }
                        // Success
                        res.send({
                            message: "Comment created successfully!",
                        })
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
        // .populate('recipe_id')
        .populate('user_id')
        .populate('replies')
        .then(data => {
            let comments = [];
            data.forEach(comment => {
                // Get comment replies
                let replies = [];
                comment.replies.forEach(reply => {
                    replies.push({
                        comment: reply.comment,
                        author: reply.user_id,
                    });
                })
                comments.push({
                    comment: comment.comment,
                    author: {
                        username: comment.user_id.username,
                    },
                    replies: replies,
                })
            })
            res.send(comments);
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

/*

exports.reply = (req, res) => {
    // Validate request
    if (!req.body.comment || !req.body.commentid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Comment
    const comment = new Comment({
        // recipe_id: req.body.recipeid,
        comment: req.body.comment,
    });

    // Check if user exists
    User.findById(req.body.userid).exec((err, data) => {
        if (err) {
            res.status(500).send({
                message: `Error retrieving User with id  ${req.body.userid}`
            });
        } else if (!data) {
            res.status(404).send({
                message: `Cannot find User with id ${req.body.userid}.`
            });
        } else {
            comment.user_id = data._id;

            // Save Comment and push to replies array
            comment.save((err, comment) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Comment."
                    });
                }
                // Success
                Comment.findByIdAndUpdate(req.body.commentid, {
                        $push: {
                            replies: comment._id
                        }
                    }, {
                        new: true
                    })
                    .then(comment => {
                        if (!comment) {
                            res.status(404).send({
                                message: `Cannot update Comment with id=${req.body.commentid}. Maybe Comment was not found!`
                            });
                        } else res.send({
                            message: "Comment updated successfully."
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating Comment with id=" + req.body.commentid
                        });
                    });
            });
        }
    });
}

*/

exports.reply = (req, res) => {
    // Validate request
    if (!req.body.comment || !req.body.commentid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Comment
    const comment = new Comment({
        user_id: req.userId,
        comment: req.body.comment,
    });

    // Save Comment and push to replies array
    comment.save((err, comment) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Comment."
            });
        }
        // Success
        Comment.findByIdAndUpdate(req.body.commentid, {
                $push: {
                    replies: comment._id
                }
            }, {
                new: true
            })
            .then(comment => {
                if (!comment) {
                    res.status(404).send({
                        message: `Cannot update Comment with id=${req.body.commentid}. Maybe Comment was not found!`
                    });
                } else res.send({
                    message: "Reply comment successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Comment with id=" + req.body.commentid
                });
            });
    });
}