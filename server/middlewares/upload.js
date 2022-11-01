const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(
            null,
            path.join(__dirname, '../uploads')
        );
    },
    filename: (req, file, cb) => {
        // console.log(file.fieldname);
        cb(
            null,
            req.userId + "-" + Date.now() + path.extname(file.originalname)
        );
    }
});

exports.upload = multer({
    storage: storage
});