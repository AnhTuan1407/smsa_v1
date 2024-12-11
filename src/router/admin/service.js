const express = require('express');
const router = express.Router();
const serviceController = require('../../app/controllers/admin/ServiceController');
const multer = require('multer');
const fileUploadMiddleware = require('../../middleware/file-upload-middleware');
const validation = require('../../validations/service');

// Cấu hình multer
const upload = multer({ dest: 'uploads/' });


router.get('/findAll', serviceController.showAll);

// Cấu hình router để sử dụng middleware upload file trước khi controller xử lý
router.post('/create', upload.single('image'), serviceController.doCreate);

router.put('/edit/:id', fileUploadMiddleware, serviceController.doEdit);

router.delete('/delete/:id', serviceController.doDelete);
router.get('/detail/:id', serviceController.showDetail);

module.exports = router;