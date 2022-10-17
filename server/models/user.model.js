const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config({
    path: "../.env",
});
const User =
    new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: String,
        lastName: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        // Followed users
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        // Followers
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        isBlocked: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        cardId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    }, {
        timestamps: true
    });
// Generate verification code
User.methods.generateVerificationCode = function () {
    const user = this;
    const verificationToken = jwt.sign({
        ID: user._id
    }, process.env.USER_VERIFICATION_TOKEN_SECRET, {
        expiresIn: '1d'
    });
    return verificationToken;
}

// Export the model

module.exports = mongoose.model("User", User);