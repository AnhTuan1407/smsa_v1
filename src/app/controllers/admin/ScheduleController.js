const db = require('../../models/index');
const initSQLModels = require('../../models/initial-models');
const models = initSQLModels(db);

class ScheduleController {
    //[GET] /api/admin/schedule/findAll
    async showAllSchedules(req, res, next) {
        try {
            const schedules = await models.SCHEDULE.findAll({});
            res.status(200).json(schedules);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!" });
        }
    }

    //[POST] /api/admin/schedule/create
    async doSplitSchedule(req, res, next) {
        try {
            const { staffIds, date, shiftId } = req.body;

            try {
                for (let staffId of staffIds) {
                    await models.SCHEDULE.create({
                        STAFF_ID: staffId,
                        WORK_DATE: date,
                        SHIFT_ID: shiftId,
                    });
                }
                res.status(200).json({ message: "Đã thêm lịch trình mới thành công!", success: true });
            } catch (error) {
                throw error;
            }
        } catch (error) {
            res.status(500).json({
                message: "Có lỗi xảy ra!",
                error: error.message,
                success: false
            });
        }
    }

    //[GET] /api/admin/schedule/findByStaff/:staffId
    async findScheduleByStaff(req, res, next) {
        try {
            const { staffId } = req.params;
            const schedules = await models.SCHEDULE.findAll({
                where: { STAFF_ID: staffId }
            });
            res.status(200).json(schedules);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!" });
        }
    }
};

module.exports = new ScheduleController();