const {
    authJwt,
    upload
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
    app.post("/api/recipe", [authJwt.verifyToken, upload.uploadRecipeImages], controller.create);

    // Retrieve all Recipes
    app.get("/api/recipes", controller.findAll);

    // Retrieve limited number of Recipes
    app.get("/api/recipes/limit/:limit", controller.findLimited);

    // Retrieve top 5 recipes with most mlems
    app.get("/api/recipes/top10", controller.findTop10);

    // Retrieve a single Recipe with recipeId
    app.get("/api/recipes/id/:recipeId", controller.findOne);

    // Retrieve all Recipes belonging to a user
    app.get("/api/recipes/user", [authJwt.verifyToken], controller.findAllByUser);

    // Retrieve all recipe belong to a user 
    app.get("/api/recipes/userid/:userId", controller.findAllByUserId);

    // // Update a Recipe with recipeId
    // app.put("/recipes/:recipeId", [authJwt.verifyToken], controller.update);

    // // Delete a Recipe with recipeId
    // app.delete("/recipes/:recipeId", [authJwt.verifyToken], controller.delete);
    // Retrieve suggestions for a recipe
    app.get("/api/recipes/suggestion", [authJwt.verifyToken], controller.findSuggestions);

    // Search recipe by category
    app.get("/api/recipes/category/:category", controller.findByCategory);

    // Get random recipe
    app.get("/api/recipes/random", controller.findRandom);

    // Save recipe
    app.post("/api/recipe/save", [authJwt.verifyToken], controller.saveRecipe);

    // Unsaved recipe
    app.post("/api/recipe/unsaved", [authJwt.verifyToken], controller.unsavedRecipe);

}