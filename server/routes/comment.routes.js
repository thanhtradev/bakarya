const {
    authJwt,
    checkBadWords
} = require("../middlewares");
const controller = require("../controllers/comment.controller.js");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Comment
    app.post("/api/comment", [authJwt.verifyToken, checkBadWords.checkVNBadWords, checkBadWords.checkENBadWords], controller.create);
    // Retrieve all Comments
    app.get("/api/comments", controller.findAll);
    // Retrieve all Comment with recipeId
    app.get("/api/comments/:recipeId", controller.findAllWithRecipeId);
};