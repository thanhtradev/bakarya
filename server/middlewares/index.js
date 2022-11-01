const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const checkBadWords = require('./checkBadWords');
const upload = require('./upload');
module.exports = {
    authJwt,
    verifySignUp,
    checkBadWords,
    upload
};