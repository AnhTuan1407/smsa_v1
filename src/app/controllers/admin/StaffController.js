const initialModelSqlServer = require('../../models/initial-models');
const db = require('../../models/index');
const models = initialModelSqlServer(db);
const bcrypt = require('bcrypt');

const multer = require('multer');
const fs = require('fs');

// Khởi tạo multer để lưu file tạm thời
const upload = multer({ dest: 'uploads/' });

async function hashPasswordBcrypt(password) {
    const saltRounds = 5; // Độ mạnh của salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

class StaffController {

    //[GET] /api/admin/staff/findAll
    async showAllStaff(req, res, next) {
        try {
            const staffList = await models.STAFF.findAll();
            res.status(200).json(staffList);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[POST] /api/admin/staff/create
    async doCreate(req, res, next) {
        try {
            const { name, email, gender, phone, address, role, locationId } = req.body;
            const imageFile = req.file;

            // Đọc file và chuyển thành base64
            const imageBase64 = imageFile
                ? fs.readFileSync(imageFile.path, { encoding: 'base64' })
                : null;

            const existStaff = await models.STAFF.findOne({
                where: { NAME: name, EMAIL: email },
            });

            if (existStaff) {
                return res.status(409).json({ message: "Nhân viên này đã tồn tại!", success: false });
            }

            //Kiểm tra số điện thoại tồn tại
            const existPhoneNumber = await models.STAFF.findOne({
                where: { PHONE: phone }
            });
            if (existPhoneNumber) {
                return res.status(400).json({ success: false, message: 'Số điện thoại này đã có người sử dụng!' });
            }

            //Tạo một tài khoản cho nhân viên

            // Hash password
            const hashedPassword = await hashPasswordBcrypt("123456");

            //Tạo tài khoản
            const newAccount = await models.ACCOUNT.create({
                USERNAME: phone,
                PASSWORD: hashedPassword, //Mật khẩu mặc định cho nhân viên là 123456
                ROLE_ID: 2, //Role staff
            });

            const account = await models.ACCOUNT.findOne({
                where: { USERNAME: phone, }
            })

            const newStaff = await models.STAFF.create({
                NAME: name,
                EMAIL: email,
                GENDER: gender,
                PHONE: phone,
                ADDRESS: address,
                ROLE: role,
                LOCATION_ID: locationId,
                RATING: 0,
                ACCOUNT_ID: account.dataValues.ACCOUNT_ID,
                IMAGE: imageBase64,
            });

            // Xóa file tạm sau khi đã chuyển đổi
            if (imageFile) fs.unlinkSync(imageFile.path);

            res.status(201).json({
                message: "Thêm mới nhân viên thành công!",
                staff: newStaff,
                success: true,
            });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[GET] /api/admin/staff/detail/:id
    async showDetail(req, res, next) {
        try {
            const id = req.params.id;
            const staff = await models.STAFF.findOne({
                where: { STAFF_ID: id },
            });

            if (!staff) {
                return res.status(404).json({ message: "Không tìm thấy nhân viên!", success: false });
            }

            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[PUT] /api/admin/staff/edit/:id
    async doEdit(req, res, next) {
        try {
            const id = req.params.id;
            const { name, email, gender, phone, address, role, locationId } = req.body;

            const staffFetch = await models.STAFF.findOne({ where: { STAFF_ID: id } });

            if (!staffFetch) {
                return res.status(404).json({ success: false, message: "Không tìm thấy nhân viên!" });
            }

            let imageBase64 = staffFetch.IMAGE;

            if (req.file) {
                const imageFile = req.file;
                imageBase64 = fs.readFileSync(imageFile.path, { encoding: 'base64' });
                fs.unlinkSync(imageFile.path);
            }

            const [updatedRowsCount] = await models.STAFF.update({
                NAME: name,
                EMAIL: email,
                GENDER: gender,
                ADDRESS: address,
                PHONE: phone,
                ROLE: role,
                IMAGE: imageBase64,
                LOCATION_ID: locationId,
            }, { where: { STAFF_ID: id } });

            if (updatedRowsCount > 0) {
                res.status(200).json({ message: "Chỉnh sửa nhân viên thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy nhân viên này!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[DELETE] /api/admin/staff/delete/:id
    async doDelete(req, res, next) {
        try {
            const id = req.params.id;

            //Tìm nhân viên theo id
            const staff = await models.STAFF.findOne({
                where: { STAFF_ID: id }
            })

            //Xóa tài khoản của nhân viên này theo accountId từ staff
            const deletedAccount = await models.ACCOUNT.destroy({
                where: { ACCOUNT_ID: staff.ACCOUNT_ID },
            })

            const deletedRowsCount = await models.STAFF.destroy({
                where: { STAFF_ID: id },
            });

            if (deletedRowsCount > 0 && deletedAccount > 0) {
                res.status(200).json({ message: "Xóa nhân viên thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy nhân viên này!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }
}

module.exports = new StaffController();
