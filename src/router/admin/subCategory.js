const express = require('express');
const router = express.Router();
const subCategoryController = require('../../app/controllers/admin/SubCategoryController');
const multer = require('multer');
// const validation = require('../../validations/service');
const fileUploadMiddleware = require('../../middleware/file-upload-middleware');

// Cấu hình multer
const upload = multer({ dest: 'uploads/' });

router.get('/findAll', subCategoryController.showAll);

// Cấu hình router để sử dụng middleware upload file trước khi controller xử lý
router.post('/create', upload.single('image'), subCategoryController.doCreate);

router.put('/edit/:id', fileUploadMiddleware, subCategoryController.doEdit);

router.delete('/delete/:id', subCategoryController.doDelete);
router.get('/detail/:id', subCategoryController.showDetail);

module.exports = router;