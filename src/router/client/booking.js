const express = require('express');
const router = express.Router();
const bookingController = require('../../app/controllers/client/BookingController');

router.get('/findAll', bookingController.showAll);
router.get('/findById/:id', bookingController.findById);
router.post('/create', bookingController.create);
router.put('/edit/:id', bookingController.edit);
router.delete('/delete/:id', bookingController.delete);

module.exports = router;