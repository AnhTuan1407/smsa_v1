const express = require('express');
const router = express.Router();
const shiftController = require('../../app/controllers/admin/ShiftController');

router.get('/findAll', shiftController.showAll);

module.exports = router;