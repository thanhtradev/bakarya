const db = require('../models');
const Report = db.report;
const Recipe = db.recipe;
const User = db.user;
const RecipeReport = db.recipeReport;
//Create and save a new report

// exports.create = (req, res) => {
//     //Validate request
//     if (!req.body.report) {
//         res.status(400).send({
//             message: "The reason can not be empty!"
//         });
//         return;
//     }

//     //Create a Report recipe
//     const report_post = new Report({
//         reason: req.enum,
//         recipe_id: req.body.recipe_id,    
//     });

//     //Check if recipe exists
//     Recipe.findById(req.body.recipeid)
//         .then(recipe => {
//             if (!recipe) {
//                 res.status(404).send({
//                     message: `Cannot find Recipe with id ${req.body.recipeid}.`
//                 });
//             } else {
//                 report_post.recipe_id = recipe._id;
//                 // Save report in the database
//                 report_post.save((err) => {
//                     if (err) {
//                         res.status(500).send({
//                             message: err.message || "Some error occurred while creating the report."
//                         });
//                     }

//                     report_post.save((err) => {
//                         if (err) {
//                             res.status(500).send({
//                                 message: err.message || "Some error occurred while updating the report of recipe."
//                             });
//                         }
//                         // Success
//                         res.send({
//                             message: "Report created successfully!",
//                         })
//                     });

//                 });
//             }
//         })
//         .catch(_ => {
//             res.status(500).send({
//                 message: "Error retrieving Recipe with id=" + req.body.recipeid
//             });
//         });

//     // --------------------------------------------------------------------------------------------------------------
//     //Create a Report profile
//     const report_profile = new Report({
//         reason: req.enum,
//         user_id: req.body.user_id,    
//     });

//     //Check if recipe exists
//     User.findById(req.body.userid)
//         .then(user => {
//             if (!user) {
//                 res.status(404).send({
//                     message: `Cannot find user with id ${req.body.userid}.`
//                 });
//             } else {
//                 report_profile.user_id = user._id;
//                 // Save report in the database
//                 report_post.save((err) => {
//                     if (err) {
//                         res.status(500).send({
//                             message: err.message || "Some error occurred while creating the report."
//                         });
//                     }

//                     report_post.save((err) => {
//                         if (err) {
//                             res.status(500).send({
//                                 message: err.message || "Some error occurred while updating the report for profile."
//                             });
//                         }
//                         // Success
//                         res.send({
//                             message: "Report created successfully!",
//                         })
//                     });

//                 });
//             }
//         })
//         .catch(_ => {
//             res.status(500).send({
//                 message: "Error retrieving User with id=" + req.body.userid
//             });
//         });    
// };

// // Retrieve all report recipe with recipeId from the database.
// exports.findAllWithRecipeId = (req, res) => {
//     Report.find({
//             recipe_id: req.params.recipeId
//         })
//         .populate('user_id')
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving reports."
//             });
//         });
// };

// // Retrieve all report profile with userId from the database.
// exports.findAllWithUserId = (req, res) => {
//     Report.find({
//             user_id: req.params.userId
//         })
//         .populate('user_id')
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving reports."
//             });
//         });
// }
// Report a recipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.recipeid || !req.body.type) {
        res.status(400).send({
            message: "The recipeid can not be empty!"
        });
        return;
    }

    // Create a Report recipe
    const report = new RecipeReport({
        type: req.body.type,
        reason: req.body.reason,
        user_id: req.userId,
    });

    // Check if recipe exists
    Recipe.findById(req.body.recipeid).exec((err, recipe) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the report."
            });
        }
        if (!recipe) {
            res.status(404).send({
                message: `Cannot find Recipe with id ${req.body.recipeid}.`
            });
        } else {
            report.recipe_id = recipe._id;
            // Save report in the database
            report.save((err) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the report."
                    });
                }
                res.send({
                    message: "Report created successfully!",
                })
            });
        }
    })
}