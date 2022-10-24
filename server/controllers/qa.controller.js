const db = require('../models');

const QA = db.qa;

// Create and Save a new QA
exports.create = (req, res) => {
    // Validate request
    if (!req.body.question) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a QA
    const qa = new QA({
        full_name: req.body.fname == null ? "" : req.body.fname,
        email: req.body.email == null ? "" : req.body.email,
        phone: req.body.phone == null ? "" : req.body.phone,
        question: req.body.question,
    });

    // Save QA in the database
    qa.save((err) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the QA."
            });
        }
        // Success
        res.send({
            message: "OK",
        })

    });
}

exports.findAll = (req, res) => {
    QA.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving QA."
            });
        });
}