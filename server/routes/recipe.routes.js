const {
    authJwt
} = require("../middlewares");
const controller = require("../controllers/recipe.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Recipe
    app.post("/api/recipe", [authJwt.verifyToken], controller.create);

    // Retrieve all Recipes
    app.get("/api/recipes", controller.findAll);

    // // Retrieve a single Recipe with recipeId
    // app.get("/recipes/:recipeId", controller.findOne);

    // // Update a Recipe with recipeId
    // app.put("/recipes/:recipeId", [authJwt.verifyToken], controller.update);

    // // Delete a Recipe with recipeId
    // app.delete("/recipes/:recipeId", [authJwt.verifyToken], controller.delete);

}