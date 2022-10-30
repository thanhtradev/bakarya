const db = require("../models");
const User = db.user;


/**
 * Follow a user by adding the user to the following list of the current user
 * and adding the current user to the followers list of the user to follow
 * @param  req.body.followuserid - id of the user to follow
 * @return 200 - OK
 */
exports.followUser = (req, res) => {

  // Get the current user and check if current followUserId is already in the following list

  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    // Check if the user is already following the user to follow
    if (user.following.includes(req.body.followuserid)) {
      res.status(400).send({
        message: "You are already following this user",
      });
      return;
    }
    // Get the user to be followed and add the current user to the followers list
    User.findById(req.body.followuserid).exec((err, userToFollow) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }
      userToFollow.followers.push(req.userId);
      userToFollow.save((err) => {
        if (err) {
          res.status(500).send({
            message: err,
          });
          return;
        }
        // Add the user to follow to the following list of the current user
        user.following.push(req.body.followuserid);
        user.save((err) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
            return;
          }
        });
        res.status(200).send({
          message: "User followed successfully",
        });
      });
    });

  });
};
/**
 * Unfollow a user by removing the user from the following list of the current user and removing the current user from the followers list of the user to unfollow
 * @param unfollowuserid - id of the user to unfollow
 * @return 200 - OK
 * @return 400 - Bad Request
 * @return 500 - Internal Server Error
 * @return 404 - Not Found
 * @return 401 - Unauthorized
 */

exports.unFollowUser = (req, res) => {
  // Get the current user and check if current unfollowuserid is already in the following list
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    // Check if the user is already following the user to follow
    if (!user.following.includes(req.body.unfollowuserid)) {
      res.status(400).send({
        message: "You are not following this user",
      });
      return;
    }
    // Get the user to be unfollowed and remove the current user from the followers list
    User.findById(req.body.unfollowuserid).exec((err, userToUnfollow) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }
      userToUnfollow.followers.pull(req.userId);
      userToUnfollow.save((err) => {
        if (err) {
          res.status(500).send({
            message: err,
          });
          return;
        }
        // Remove the user to unfollow from the following list of the current user
        user.following.pull(req.body.unfollowuserid);
        user.save((err) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
            return;
          }
        });
        res.status(200).send({
          message: "Unfollowed successfully",
        });
      });
    });
  });
};

//Update user profile
exports.updateUserProfile = (req, res, next) => {
  User.updateMany({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).exec().then((result) => {
      res.status(200).send({
        message: "User updated"
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: err
      });
    });
};