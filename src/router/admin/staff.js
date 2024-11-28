const staffController = require('../../app/controllers/admin/StaffController');
// const validate = require('../validations/staff');
const express = require('express');
const router = express.Router();

router.get('/findAll', staffController.showAllStaff);
router.post('/create', staffController.doCreate);
router.put('/edit/:id', staffController.doEdit);
router.delete('/delete/:id', staffController.doDelete);
router.get('/detail/:id', staffController.showDetail);

module.exports = router;