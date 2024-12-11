const express = require('express');
const router = express.Router();
const locationController = require('../../app/controllers/admin/LocationController');

router.get('/findAll', locationController.showAll);

module.exports = router;