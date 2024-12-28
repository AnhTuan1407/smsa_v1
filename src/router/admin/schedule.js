const express = require('express');
const router = express.Router();
const scheduleController = require('../../app/controllers/admin/ScheduleController');

router.get('/findAll', scheduleController.showAllSchedules);
router.post('/create', scheduleController.doSplitSchedule);
router.get('/findByStaff/:staffId', scheduleController.findScheduleByStaff);

module.exports = router;