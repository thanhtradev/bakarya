const mongoose = require('mongoose');

const Report = mongoose.model(
    'Report',
    new mongoose.Schema({
        report_post: {
            type: String,
            enum: ['Spam', 'Hate speech', 'Harassment', 'False information', 'Something else']
        },
        report_profile: {
            type: String,
            enum: ['Pretending to be someone', 'Fake account', 'Posting inappropriate things', 'Somthing else']
        },
        recipe_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }],
        user_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    }, {
        timestamps: true
    })
);

    module.exports = Report;
