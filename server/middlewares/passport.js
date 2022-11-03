const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const db = require("../models");
const User = db.user;


passport.use(
    new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            if (profile.id) {
                // check if user already exists in our own db
                User.findOne({
                    email: profile.emails[0].value
                }).then((currentUser) => {
                    if (currentUser) {
                        // already have this user
                        done(null, currentUser);
                    } else {
                        // if not, create user in our db
                        new User({
                            googleId: profile.id,
                            username: profile.emails[0].value,
                            email: profile.emails[0].value,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            avatarUrl: profile.photos[0].value,
                            isVerified: true,
                            roles: [mongoose.Types.ObjectId("63329c8e4c1aa4012462e5b7")]
                        }).save().then((newUser) => {
                            done(null, newUser);
                        });
                    }
                });
            }
        }
    ));

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        console.log('serializing user: ');
        console.log(user);
        done(null, user);
    });

});

passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        done(null, user);
    });
});

exports.googleLogin = passport.authenticate('google', {
    scope: ['profile', 'email']
});

exports.googleRedirect = (req, res, next) => {
    passport.authenticate('google')
};