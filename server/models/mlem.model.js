const mongoose = require('mongoose');

const Mlem = mongoose.model('Mlem',
    new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        recipe_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
        },
        mlem: {
            type: Boolean,
            default: true,
        }
    }, {
        timestamps: true
    })
);

module.exports = Mlem;