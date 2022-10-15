const mongoose = require('mongoose');

const Comment = mongoose.model(
    'Comment',
    new mongoose.Schema({
        recipe_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: String,

    }, {
        timestamps: true
    })
);

module.exports = Comment;