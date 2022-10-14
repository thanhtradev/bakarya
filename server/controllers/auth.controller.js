const nodemailer = require('nodemailer');
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

require("dotenv").config({
  path: "../.env",
});

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
      return;
    }
    if (req.body.roles) {
      Role.find({
          name: {
            $in: req.body.roles,
          },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              return;
            }

            res.send({
              message: "User was registered successfully!",
            });
          });
        }
      );
    } else {
      Role.findOne({
          name: "baker",
        },
        (err, role) => {
          if (err) {
            res.status(500).send({
              message: err,
            });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({
                message: err,
              });
              return;
            }

            // Generate verification code
            const verificationToken = user.generateVerificationCode();

            // Get email verification page
            url = `http://api.bakarya.com/api/auth/verify/${verificationToken}`;
            ejs.renderFile('./template/email_verification.ejs', {
              link: url
            }, (err, data) => {
              if (err) {
                console.log(err)
              } else {
                // Send verification email
                transporter.sendMail({
                  to: user.email,
                  subject: 'Please verify your email',
                  html: data
                  // html: `Please click this link to confirm your email: <a href="${url}">here</a>`
                }, (err, info) => {
                  if (err) {
                    res.status(500).send({
                      message: err,
                    });
                    return;
                  }
                  res.send({
                    message: "User was registered successfully! Please check your email to verify your account.",
                  });
                });
              }
            })

            // res.send({
            //   message: "User was registered successfully!",
            // });
          });
        }
      );
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
      username: req.body.username
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err
        });
        return;
      }

      if (!user) {
        return res.status(404).send({
          message: "User not found"
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({
        id: user.id
      }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

// Verify email
exports.verify = (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.status(422).send({
      message: "Missing token"
    });
  }
  let payload = null;
  // Verify token from URL
  try {
    payload = jwt.verify(
      token,
      process.env.USER_VERIFICATION_TOKEN_SECRET
    );
  } catch (e) {
    return res.status(500).send(e);
  }
  // Find user by id
  User.findById(payload.ID, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: err
      });
    }
    if (!user) {
      return res.status(404).send({
        message: "User not found"
      });
    }
    // Verify user
    user.isVerified = true;
    user.save((err) => {
      if (err) {
        return res.status(500).send({
          message: err
        });
      }
      res.status(200).send({
        message: "User verified successfully"
      });
    });
  });
}