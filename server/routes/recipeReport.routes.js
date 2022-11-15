const {
    authJwt
} = require("../middlewares");

const controller = require("../controllers/recipeReport.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //Create a new post report
    app.post("/api/recipe/report", [authJwt.verifyToken], controller.create);
    //Create a new profile report
    // app.post("/api/report_profile", [authJwt.verifyToken], controller.create);
    // //Retrieve all post report
    // app.get("/api/report_post/:recipeId", controller.findAllWithRecipeId);
    // //Retrieve all profile report
    // app.get("/api/report_profile/:userId", controller.findAllWithUserId);
}