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
    },

});

function fileFilter(req, file, cb) {

    // Allowed ext
    const filetypes = /jpeg|jpg|png/;

    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        console.log('Error: Images Only!');
        cb('Error: Images Only!');
    }
};



uploadAvatar = (req, res, next) => {
    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
    }).single('avatar');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        next();
    });
}

uploadRecipeImages = (req, res, next) => {
    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
    }).array('images', 3);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        next();
    });
}

const upload = {
    uploadAvatar,
    uploadRecipeImages
}
module.exports = upload;