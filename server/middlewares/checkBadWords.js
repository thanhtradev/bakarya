const VNBadWords = require('vn-badwords');
const ENBadWords = require('badwords-list');

checkVNBadWords = function (req, res, next) {
    if (VNBadWords.regexp.test(req.body.comment)) {
        res.status(400).send({
            message: "Bad words are not allowed!"
        });
        return;
    }
    next();
}

checkENBadWords = function (req, res, next) {
    if (ENBadWords.regex.test(req.body.comment)) {
        res.status(400).send({
            message: "Bad words are not allowed!"
        });
        return;
    }
    next();
}

const checkBadWords = {
    checkVNBadWords,
    checkENBadWords
}

module.exports = checkBadWords;