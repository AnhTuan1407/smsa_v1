const staffController = require('../../app/controllers/admin/StaffController');
// const validate = require('../validations/staff');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const fileUploadMiddleware = require('../../middleware/file-upload-middleware');

// Cấu hình multer
const upload = multer({ dest: 'uploads/' });

router.get('/findAll', staffController.showAllStaff);
router.post('/create', upload.single('image'), staffController.doCreate);
router.put('/edit/:id', fileUploadMiddleware, staffController.doEdit);
router.delete('/delete/:id', staffController.doDelete);
router.get('/detail/:id', staffController.showDetail);

module.exports = router;