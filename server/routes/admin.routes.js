const {
    authJwt
} = require("../middlewares");

const controller = require("../controllers/admin.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Retrieve information for overview
    // Return the number of products, users, orders, and categories
    app.get("/api/admin/overview", [authJwt.verifyToken], controller.overview);

    // Retrieve all users
    app.get("/api/admin/users", [authJwt.verifyToken, authJwt.isAdmin], controller.findAllUsers);

    //Block user by id
    app.put("/api/admin/users/:userId/block", [authJwt.verifyToken, authJwt.isAdmin], controller.blockUser);

    //Unlock user by id
    app.put("/api/admin/users/:userId/unblock", [authJwt.verifyToken, authJwt.isAdmin], controller.unBlockUser);

    // Retrieve all recipes
    app.get("/api/admin/recipes", [authJwt.verifyToken, authJwt.isAdmin], controller.findAllRecipes);

    // Block recipe by id
    app.put("/api/admin/recipes/:recipeId/block", [authJwt.verifyToken, authJwt.isAdmin], controller.blockRecipe);

    // Unlock recipe by id
    app.put("/api/admin/recipes/:recipeId/unblock", [authJwt.verifyToken, authJwt.isAdmin], controller.unBlockRecipe);

    // Get all recipe reports
    app.get("/api/admin/recipe-reports", [authJwt.verifyToken, authJwt.isAdmin], controller.findAllRecipeReports);

    // Update recipe report status
    app.put("/api/admin/recipe-reports/:recipeReportId", [authJwt.verifyToken, authJwt.isAdmin], controller.updateRecipeReportStatus);

    // Get recipe chart data
    app.get("/api/admin/recipe-chart", [authJwt.verifyToken, authJwt.isAdmin], controller.generateRecipeChartData);

    // Get user chart data
    app.get("/api/admin/user-chart", [authJwt.verifyToken, authJwt.isAdmin], controller.generateUserChartData);
};