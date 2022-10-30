const db = require("../models");
const User = db.user;
const Role = db.role;
const Recipe = db.recipe;
const Product = db.product;


// Retrieve information for overview
// Return the number of products, users, orders, and categories
exports.overview = (req, res) => {
    User.countDocuments({}, (err, totalUsers) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
            return;
        }
        Recipe.countDocuments({}, (err, totalRecipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipe."
                });
                return;
            }
            Product.countDocuments({}, (err, totalProducts) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving product."
                    });
                    return;
                }
                res.send({
                    totalUsers: totalUsers,
                    totalRecipes: totalRecipes,
                    totalProducts: totalProducts
                });
            });
        });
    });



};



// Retrieve all Users from the database.

exports.findAllUsers = (req, res) => {
    User.find()
        .populate('roles')
        .exec((err, users) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            var returnUsers = [];
            users.forEach(user => {
                var authorities = [];
                for (let i = 0; i < user.roles.length; i++) {
                    authorities.push(user.roles[i].name.toUpperCase());
                }
                returnUsers.push({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    registerDate: user.createdAt,
                    isBlocked: user.isBlocked,
                    followers: user.followers.length,
                    following: user.following.length,
                });
            });

            res.status(200).send(returnUsers);
        });
}

// Block user by id

exports.blockUser = (req, res) => {
    const id = req.params.userId;
    User.findByIdAndUpdate(id, {
            isBlocked: true
        }, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot block user with id=${id}. Maybe user was not found!`
                });
            } else res.send({
                message: "User was blocked successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
}

//Unlock user by id

exports.unBlockUser = (req, res) => {

    const id = req.params.userId;

    User.findByIdAndUpdate(id, {
            isBlocked: false
        }, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot unlock user with id=${id}. Maybe user was not found!`
                });
            } else res.send({
                message: "User was unlocked successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
}