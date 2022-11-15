const mongoose = require('mongoose');

const RecipeReport = mongoose.model(
    'RecipeReport',
    new mongoose.Schema({
        type: {
            type: String,
            enum: ['Spam', 'Hate speech', 'Harassment', 'False information', 'Something else']
        },
        // report_profile: {
        //     type: String,
        //     enum: ['Pretending to be someone', 'Fake account', 'Posting inappropriate things', 'Something else']
        // },
        recipe_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reason: String,
        status: {
            type: String,
            enum: ['Pending', 'Resolved'],
            default: 'Pending'
        },
    }, {
        timestamps: true
    })
);

module.exports = RecipeReport;