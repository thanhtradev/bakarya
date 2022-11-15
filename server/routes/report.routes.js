const {
    authJwt
} = require("../middlewares");

const controller = require("../controllers/report.controller.js");

module.export = function(app){
    //Create a new post report
    app.post("/api/report_post", [authJwt.verifyToken], controller.create);
    //Create a new profile report
    app.post("/api/report_profile", [authJwt.verifyToken], controller.create);
    //Retrieve all post report
    app.get("/api/report_post/:recipeId", controller.findAllWithRecipeId);
    //Retrieve all profile report
    app.get("/api/report_profile/:userId", controller.findAllWithUserId);
}