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

exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});