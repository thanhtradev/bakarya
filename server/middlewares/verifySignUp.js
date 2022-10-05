const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkEnoughInformation = (req, res, next) => {
  // Username
  if (!req.body.username) {
    res.status(400).send({
      message: "Username is required!",
    });
    return;
  }

  // Email
  if (!req.body.email) {
    res.status(400).send({
      message: "Email is required!",
    });
    return;
  }

  // Password
  if (!req.body.password) {
    res.status(400).send({
      message: "Password is required!",
    });
    return;
  }

  next();
};

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }

    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }

      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    });
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

checkPasswordInvalid = (req, res, next) => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(req.body.password)) {
    res.status(400).send({
      message: "Failed! Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character.",
    });
    return;
  }
  next();
};

const verifySignUp = {
  checkEnoughInformation,
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkPasswordInvalid,
};

module.exports = verifySignUp;