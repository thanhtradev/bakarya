const {
    authJwt
} = require("../middlewares");

const controller = require("../controllers/order.controller.js");
module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/order", [authJwt.verifyToken], controller.create);
    app.get("/api/orders", controller.findAll);
    app.get("/api/orders/:orderId", controller.findOne);
    app.get("/api/orders/user/:userId", controller.findByUser);
    app.put("/api/orders/:orderId", [authJwt.verifyToken], controller.update);
    app.delete("/api/orders/:orderId", [authJwt.verifyToken], controller.delete);
};