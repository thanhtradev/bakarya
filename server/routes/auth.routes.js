const {
  verifySignUp,
  authJwt
} = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkEnoughInformation,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkPasswordInvalid
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  // Login with google account
  app.post("/api/auth/google", controller.googleLogin);

  // Verify email 
  app.get("/api/auth/verify/:token", controller.verify);

  // Forgot password
  // app.post("/api/auth/forgot-password", controller.forgotPassword);

  // Check user is admin
  app.get(
    "/api/auth/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.authorizeAdmin
  );
};