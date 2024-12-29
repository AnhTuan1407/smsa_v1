const express = require('express');
const router = express.Router();
const customerController = require('../../app/controllers/admin/CustomerController');
const validate = require('../../validations/customer');

router.get('/findAll', customerController.showAllCustomer);
router.post('/create', validate.customerValidation, customerController.doCreate);
router.put('/edit/:id', validate.customerValidation, customerController.doEdit);
router.put('/edit/', validate.customerValidation, customerController.edit);
router.delete('/delete/:id', customerController.doDelete);
router.get('/detail/:id', customerController.showDetail);

module.exports = router;
