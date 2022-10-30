const {
  authJwt
} = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all", controller.allAccess);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/auth/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );

  // Follow a user
  app.post("/api/user/follow", [authJwt.verifyToken], controller.followUser);

  // Unfollow a user
  app.post("/api/user/unfollow", [authJwt.verifyToken], controller.unFollowUser);

  // Update user profile
  app.post("/api/user/update", [authJwt.verifyToken], controller.updateUserProfile);
};