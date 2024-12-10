const express = require('express');
const router = express.Router();
const categoryController = require('../../app/controllers/admin/CategoryController');
// const validate = require('../../validations/customer');

router.get('/findAll', categoryController.showAllCategory);
router.post('/create', categoryController.doCreate);
router.put('/edit/:id', categoryController.doEdit);
router.get('/detail/:id', categoryController.showDetail);
router.delete('/delete/:id', categoryController.doDelete);

module.exports = router;
