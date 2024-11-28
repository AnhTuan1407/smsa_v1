const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/auth/AuthController');
const validate = require('../validations/auth');

router.get('/findAll', authController.showAllAccount);
router.post('/register', validate.registerPost, authController.doRegister);
router.post('/login', validate.loginPost, authController.doLogin);
router.get('/logout', authController.doLogout);

module.exports = router;
