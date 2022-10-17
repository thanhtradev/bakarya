const {
    authJwt
} = require("../middlewares");

const controller = require("../controllers/mlem.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Mlem
    app.post("/api/mlem", [authJwt.verifyToken], controller.mlem);

    // Unmlem a Mlem and update the mlem count of the recipe
    app.post("/api/unmlem", [authJwt.verifyToken], controller.unmlem);

    // Retrieve all Mlem with recipeId
    app.get("/api/mlems/:recipeId", controller.findAllWithRecipeId);
}