const db = require('../../models/index');
const initSQLModels = require('../../models/initial-models');
const models = initSQLModels(db);

class LocationController {
    //[GET] /api/admin/location/findAll
    async showAll(req, res, next) {
        try {
            const data = await models.LOCATION.findAll({});
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }
};

module.exports = new LocationController();