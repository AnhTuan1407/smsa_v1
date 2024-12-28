const db = require('../../models/index');
const initSQLModels = require('../../models/initial-models');
const models = initSQLModels(db);

class ShiftController {
    //[GET] /api/admin/shift/findAll
    async showAll(req, res, next) {
        try {
            const data = await models.SHIFT.findAll({});
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }
};

module.exports = new ShiftController();