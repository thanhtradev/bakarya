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

    //Retrieve information for overview
    // Return the number of products, users, orders, and categories
    app.get("/api/admin/overview", [authJwt.verifyToken], controller.overview);

    // Retrieve all users
    app.get("/api/admin/users", [authJwt.verifyToken, authJwt.isAdmin], controller.findAllUsers);

    //Block user by id
    app.put("/api/admin/users/:userId/block", [authJwt.verifyToken, authJwt.isAdmin], controller.blockUser);

    //Unlock user by id
    app.put("/api/admin/users/:userId/unblock", [authJwt.verifyToken, authJwt.isAdmin], controller.unBlockUser);

};