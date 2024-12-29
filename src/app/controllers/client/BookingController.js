const db = require('../../models/index');
const initSQLModels = require('../../models/initial-models');
const models = initSQLModels(db);

class BookingController {
    //[GET] /api/client/booking/findAll
    async showAll(req, res, next) {
        try {
            const data = await models.APPOINTMENT.findAll({});
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[GET] /api/client/booking/findById/:id
    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await models.APPOINTMENT.findByPk(id);
            if (data) {
                res.status(200).json({ success: true, data });
            } else {
                res.status(404).json({ message: "Không tìm thấy booking!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[POST] /api/client/booking/create
    async create(req, res, next) {
        try {
            const { customerId, staffId, serviceIds, date, time, endTime } = req.body;

            // Tạo mới một bản ghi trong bảng APPOINTMENT
            const newBooking = await models.APPOINTMENT.create({
                CUSTOMER_ID: customerId,
                STAFF_ID: staffId,
                DATE_BOOKING: date,
                TIME_BOOKING: time,
                TIME_END: endTime,
                STATUS: "Coming soon",
            });

            // Thêm các bản ghi vào bảng APPOINTMENT_DETAIL
            for (let serviceId of serviceIds) {
                await models.APPOINTMENT_DETAIL.create({
                    APPOINTMENT_ID: newBooking.APPOINTMENT_ID,
                    SERVICE_ID: serviceId,
                });
            }

            res.status(201).json({ success: true, data: newBooking });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[PUT] /api/client/booking/edit/:id
    async edit(req, res, next) {
        try {
            const { id } = req.params;
            const { customerId, staffId, serviceIds, date, time } = req.body;
            const booking = await models.APPOINTMENT.findByPk(id);
            if (booking) {
                booking.CUSTOMER_ID = customerId;
                booking.STAFF_ID = staffId;
                booking.SERVICE_IDS = serviceIds;
                booking.DATE = date;
                booking.TIME = time;
                await booking.save();
                res.status(200).json({ success: true, data: booking });
            } else {
                res.status(404).json({ message: "Không tìm thấy booking!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[DELETE] /api/client/booking/delete/:id
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const booking = await models.APPOINTMENT.findByPk(id);
            if (booking) {
                await booking.destroy();
                res.status(200).json({ success: true, message: "Đã xóa booking thành công!" });
            } else {
                res.status(404).json({ message: "Không tìm thấy booking!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[GET] /api/client/booking/findByStaff/:staffId
    async findByStaff(req, res, next) {
        try {
            const { staffId } = req.params;
            const data = await models.APPOINTMENT.findAll({
                where: { STAFF_ID: staffId }
            });
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[GET] /api/client/booking/findByCustomer/:customerId
    async findByCustomer(req, res, next) {
        try {
            const { customerId } = req.params;
            const data = await models.APPOINTMENT.findAll({
                where: { CUSTOMER_ID: customerId }
            });
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }
};

module.exports = new BookingController();