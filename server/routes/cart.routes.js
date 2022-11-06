const {
    authJwt
} = require("../middlewares");

const controller = require("../controllers/cart.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new cart
    app.post("/api/cart", [authJwt.verifyToken], controller.create);
    // Retrieve a cart by userId
    app.get("/api/cart", [authJwt.verifyToken], controller.findCart);
    // Update cart item quantity
    app.put("/api/cart/update", [authJwt.verifyToken], controller.update);
    // Delete cart item
    app.delete("/api/cart/delete", [authJwt.verifyToken], controller.delete);
}