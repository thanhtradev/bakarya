const {
    authJwt
} = require("../middlewares");

const controller = require("../controllers/product.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //Create a new product
    app.post("/api/product", [authJwt.verifyToken], controller.create);

    //Retrieve all products
    app.get("/api/products", controller.findAll);

    //Retrieve a single product with productId
    app.get("/api/products/:productId", controller.findOne);

    //Retrieve product with specific category
    app.get("/api/products/category/:category", controller.findByCategory);
}