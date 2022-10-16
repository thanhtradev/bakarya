const db = require('../models');
const User = db.user;

// Follow a user
// params: followUserId (id of the user to follow)

/**
 * Follow a user by adding the user to the following list of the current user
 * and adding the current user to the followers list of the user to follow
 * @param  req.body.followUserId - id of the user to follow
 * @return 200 - OK 
 */
exports.followUser = (req, res) => {

  // Get the current user and check if current followUserId is already in the following list

  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }
    // Check if the user is already following the user to follow
    if (user.following.includes(req.body.followUserId)) {
      res.status(400).send({
        message: "You are already following this user"
      });
      return;
    }
    // Add the user to follow to the following list of the current user
    user.following.push(req.body.followUserId);
    user.save((err) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }
      // Get the user to follow and add the current user to the followers list
      User.findById(req.body.followUserId).exec((err, userToFollow) => {
        if (err) {
          res.status(500).send({
            message: err
          });
          return;
        }
        userToFollow.followers.push(req.userId);
        userToFollow.save((err) => {
          if (err) {

            res.status(500).send({
              message: err
            });
            return;
          }
          res.status(200).send({
            message: "User followed successfully"
          });
        });
      });
    });
  });
}