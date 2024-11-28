const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const uploadIfFileExists = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: "Có lỗi xảy ra khi tải lên tệp!" });
        }

        if (!req.file) {
            console.log('Không có file được tải lên, bỏ qua và tiếp tục...');
            return next();
        }

        console.log('File được tải lên:', req.file);
        next();
    });
};

module.exports = uploadIfFileExists;
