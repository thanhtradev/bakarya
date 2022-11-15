const {
    user
} = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Recipe = db.recipe;
const Product = db.product;
const RecipeReport = db.recipeReport;


// Retrieve information for overview
// Return the number of products, users, orders, and categories
exports.overview = (req, res) => {
    // Calculate the new users in the last 24 hours
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);


    User.countDocuments({}, (err, totalUsers) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
            return;
        }
        User.countDocuments({
            createdAt: {
                $gte: last24Hours
            }
        }).exec((err, newUsers) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            }
            Recipe.countDocuments({}, (err, totalRecipes) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving recipe."
                    });
                    return;
                }
                Recipe.countDocuments({
                    createdAt: {
                        $gte: last24Hours
                    }
                }).exec((err, newRecipes) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while retrieving users."
                        });
                    }
                    Product.countDocuments({}, (err, totalProducts) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message || "Some error occurred while retrieving product."
                            });
                            return;
                        }
                        Product.countDocuments({
                            createdAt: {
                                $gte: last24Hours
                            }
                        }).exec((err, newProducts) => {
                            if (err) {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while retrieving users."
                                });
                            }

                            RecipeReport.countDocuments({
                                status: 'Pending'
                            }).exec((err, pendingReports) => {
                                if (err) {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while retrieving users."
                                    });
                                }
                                res.send({
                                    totalUsers: totalUsers,
                                    newUsers: newUsers,
                                    totalRecipes: totalRecipes,
                                    newRecipes: newRecipes,
                                    totalProducts: totalProducts,
                                    newProducts: newProducts,
                                    pendingReports: pendingReports,
                                });
                            });

                        })

                    });
                })

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

// Retrieve all Recipes from the database.
exports.findAllRecipes = (req, res) => {
    Recipe.find()
        .populate('categories')
        // .populate('author')
        .exec((err, recipes) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }
            var returnRecipes = [];
            recipes.forEach(recipe => {
                returnRecipes.push({
                    id: recipe._id,
                    name: recipe.name,
                    categories: recipe.categories.map(category => category.name),
                    createdTime: recipe.createdAt,
                    isActive: recipe.is_active,
                });
            });
            res.status(200).send(returnRecipes);
        });
};

// Block recipe by id
exports.blockRecipe = (req, res) => {
    const id = req.params.recipeId;
    Recipe.findByIdAndUpdate(id, {
            is_active: false
        }, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot block recipe with id=${id}. Maybe recipe was not found!`
                });
            } else res.send({
                message: "Recipe was blocked successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating recipe with id=" + id
            });
        });
}

//Unlock recipe by id
exports.unBlockRecipe = (req, res) => {
    const id = req.params.recipeId;
    Recipe.findByIdAndUpdate(id, {
            is_active: true
        }, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot unlock recipe with id=${id}. Maybe recipe was not found!`
                });
            } else res.send({
                message: "Recipe was unlocked successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating recipe with id=" + id
            });
        });
}

// Get all recipe reports
exports.findAllRecipeReports = (req, res) => {
    RecipeReport.find()
        // .populate('recipe')
        // .populate('user')
        .exec((err, reports) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving reports."
                });
                return;
            }

            res.status(200).send(reports);
        });
}

//Update recipe report status
exports.updateRecipeReportStatus = (req, res) => {
    console.log(req.body);
    const id = req.params.recipeReportId;
    // Find all reports with the same recipe id
    RecipeReport.findById(id).exec((err, report) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving reports."
            });
            return;
        }
        RecipeReport.updateMany({
            recipe_id: report.recipe_id
        }, {
            status: req.body.status
        }, {
            useFindAndModify: false
        }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update report with id=${id}. Maybe report was not found!`
                });
            } else res.send({
                message: "Report was updated successfully."
            });
        }).catch(err => {
            res.status(500).send({
                message: "Error updating report with id=" + id
            });
        });
    });
    // RecipeReport.findByIdAndUpdate(id, {
    //         status: req.body.status
    //     }, {
    //         useFindAndModify: false
    //     })
    //     .exec((err, report) => {
    //         if (err) {
    //             res.status(500).send({
    //                 message: err.message || "Some error occurred while updating report."
    //             });
    //             return;
    //         }
    //         res.status(200).send();
    //     });
}

// Generate recipe chart data
exports.generateRecipeChartData = (req, res) => {
    Recipe.find().exec((err, recipes) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes."
            });
            return;
        }
        // Get the last 14 days
        var date = new Date();
        var dates = [];
        for (var i = 0; i < 14; i++) {
            dates.push(new Date(date.setDate(date.getDate() - 1)));
        }
        // Revert the array
        dates.reverse();
        // Get sum of recipes created each day in the last 14 days
        var recipeCount = [];
        dates.forEach(date => {
            var count = 0;
            recipes.forEach(recipe => {
                if (recipe.createdAt.getDate() == date.getDate() && recipe.createdAt.getMonth() == date.getMonth() && recipe.createdAt.getFullYear() == date.getFullYear()) {
                    count++;
                }
            });
            if (recipeCount.length > 0) {
                count = count + recipeCount[recipeCount.length - 1];
            }
            recipeCount.push(count);
        });
        res.status(200).send({
            dates: dates,
            recipeCount: recipeCount
        });
    });
} // Generate user chart data
exports.generateUserChartData = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving recipes."
            });
            return;
        }
        // Get the last 14 days
        var date = new Date();
        var dates = [];
        for (var i = 0; i < 14; i++) {
            dates.push(new Date(date.setDate(date.getDate() - 1)));
        }
        // Revert the array
        dates.reverse();
        // Get sum of users created each day in the last 14 days
        var userCount = [];
        // Get sum of users register before the last 14 days
        User.countDocuments({
            createdAt: {
                $lt: dates[0]
            }
        }).exec((err, beforeCount) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving recipes."
                });
                return;
            }

            console.log(beforeCount);
            for (var i = 0; i < dates.length; i++) {
                var count = 0;
                for (var j = 0; j < users.length; j++) {
                    if (users[j].createdAt) {
                        if (users[j].createdAt.getDate() == dates[i].getDate() && users[j].createdAt.getMonth() == dates[i].getMonth() && users[j].createdAt.getFullYear() == dates[i].getFullYear()) {
                            count++;
                        }
                    }
                }
                if (i == 0) {
                    count + beforeCount;
                }
                if (userCount.length > 0) {
                    count = count + userCount[userCount.length - 1];
                }
                userCount.push(count);
            }

            // dates.forEach(date => {
            //     var count = 0;
            //     users.forEach(user => {
            //         if (user.createdAt) {
            //             if (user.createdAt.getDate() == date.getDate() && user.createdAt.getMonth() == date.getMonth() && user.createdAt.getFullYear() == date.getFullYear()) {
            //                 count++;
            //             }
            //         }
            //     });
            //     if (userCount.length > 0) {
            //         count = count + userCount[userCount.length - 1];
            //     }
            //     userCount.push(count);
            // });
            res.status(200).send({
                dates: dates,
                userCount: userCount
            });
        });
        // var userCount = [];
        // dates.forEach(date => {
        //     var count = 0;
        //     users.forEach(user => {
        //         if (user.createdAt.getDate() == date.getDate() && user.createdAt.getMonth() == date.getMonth() && user.createdAt.getFullYear() == date.getFullYear()) {
        //             count++;
        //         }
        //     });
        //     if (userCount.length > 0) {
        //         count = count + userCount[userCount.length - 1];
        //     }
        //     userCount.push(count);
        // });
        // res.status(200).send({
        //     dates: dates,
        //     userCount: userCount
        // });
    });
}