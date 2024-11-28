const initialModelSqlServer = require('../../models/initial-models');
const db = require('../../models/index');
const models = initialModelSqlServer(db);
const bcrypt = require('bcrypt');

async function hashPasswordBcrypt(password) {
    const saltRounds = 5; // Độ mạnh của salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

class StaffController {

    //[GET] /api/staff/findAll
    async showAllStaff(req, res, next) {
        try {
            const staffList = await models.STAFF.findAll();
            res.status(200).json(staffList);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[POST] /api/staff/create
    async doCreate(req, res, next) {
        try {
            const data = req.body;

            const existStaff = await models.STAFF.findOne({
                where: { NAME: data.name, EMAIL: data.email },
            });

            if (existStaff) {
                return res.status(409).json({ message: "Nhân viên này đã tồn tại!" });
            }

            //Kiểm tra số điện thoại tồn tại
            const existPhoneNumber = await models.STAFF.findOne({
                where: { PHONE: data.phoneNumber }
            });
            if (existPhoneNumber) {
                return res.status(400).json({ success: false, message: 'Số điện thoại này đã có người sử dụng!' });
            }

            //Tạo một tài khoản cho nhân viên

            // Hash password
            const hashedPassword = await hashPasswordBcrypt("123456");

            //Tạo tài khoản
            const newAccount = await models.ACCOUNT.create({
                USERNAME: data.phoneNumber,
                PASSWORD: hashedPassword, //Mật khẩu mặc định cho nhân viên là 123456
                ROLE_ID: 2, //Role staff
            });

            const account = await models.ACCOUNT.findOne({
                where: { USERNAME: data.phoneNumber, }
            })

            const newStaff = await models.STAFF.create({
                NAME: data.name,
                EMAIL: data.email,
                GENDER: data.gender,
                ADDRESS: data.address,
                PHONE: data.phoneNumber,
                ROLE: data.role,
                RATING: 0,
                ACCOUNT_ID: account.dataValues.ACCOUNT_ID,
                LOCATION_ID: data.locationId,
            });

            res.status(201).json({
                message: "Thêm mới nhân viên thành công!",
                staff: newStaff,
            });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[GET] /api/staff/detail/:id
    async showDetail(req, res, next) {
        try {
            const id = req.params.id;
            const staff = await models.STAFF.findOne({
                where: { STAFF_ID: id },
            });

            if (!staff) {
                return res.status(404).json({ message: "Không tìm thấy nhân viên!" });
            }

            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[PUT] /api/staff/edit/:id
    async doEdit(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;

            const [updatedRowsCount] = await models.STAFF.update({
                NAME: data.name,
                EMAIL: data.email,
                GENDER: data.gender,
                PHONE: data.phoneNumber,
                ADDRESS: data.address,
                ROLE: data.role,
                LOCATION_ID: data.locationId,
                ACCOUNT_ID: data.accountId,
            }, { where: { STAFF_ID: id } });

            if (updatedRowsCount > 0) {
                res.status(200).json({ message: "Chỉnh sửa nhân viên thành công!" });
            } else {
                res.status(404).json({ message: "Không tìm thấy nhân viên để chỉnh sửa!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[DELETE] /api/staff/delete/:id
    async doDelete(req, res, next) {
        try {
            const id = req.params.id;

            const deletedRowsCount = await models.STAFF.destroy({
                where: { STAFF_ID: id },
            });

            if (deletedRowsCount > 0) {
                res.status(200).json({ message: "Xóa nhân viên thành công!" });
            } else {
                res.status(404).json({ message: "Không tìm thấy nhân viên để xóa!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }
}

module.exports = new StaffController();
