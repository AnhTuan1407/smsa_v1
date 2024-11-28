const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../../models/index');
const initialModelSqlServer = require('../../models/initial-models');
const models = initialModelSqlServer(db);

async function hashPasswordBcrypt(password) {
    const saltRounds = 5; // Độ mạnh của salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

class AuthController {
    // [GET] /api/accounts/findAll
    async showAllAccount(req, res) {
        try {
            const accounts = await models.ACCOUNT.findAll();
            return res.status(200).json({ success: true, data: accounts });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // [POST] /api/accounts/register
    async doRegister(req, res) {
        const data = req.body;
        try {
            // Hash password
            const hashedPassword = await hashPasswordBcrypt(data.password);
            data.password = hashedPassword;

            // Kiểm tra username tồn tại
            const existUsername = await models.ACCOUNT.findOne({
                where: { USERNAME: data.username }
            });
            if (existUsername) {
                return res.status(400).json({ success: false, message: 'Tên đăng nhập đã tồn tại!' });
            }

            //Kiểm tra số điện thoại tồn tại
            const existPhoneNumber = await models.CUSTOMER.findOne({
                where: { PHONE: data.phoneNumber }
            });
            if (existPhoneNumber) {
                return res.status(400).json({ success: false, message: 'Số điện thoại này đã có người sử dụng!' });
            }


            // Tạo tài khoản mới
            const newAccount = await models.ACCOUNT.create({
                USERNAME: data.username,
                PASSWORD: data.password,
                ROLE_ID: 3, // Default role ID
            });

            // Tạo thông tin người dùng
            const account = await models.ACCOUNT.findOne({
                where: { USERNAME: data.username },
            });

            const newCustomer = await models.CUSTOMER.create({
                NAME: data.name,
                PHONE: data.phoneNumber,
                POINTS: 0,
                ACCOUNT_ID: account.dataValues.ACCOUNT_ID,
            });

            return res.status(201).json({ success: true, message: 'Đăng ký tài khoản thành công!', data: newAccount });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // [POST] /api/accounts/login
    async doLogin(req, res) {
        const data = req.body;

        try {
            const account = await models.ACCOUNT.findOne({
                where: { USERNAME: data.username }
            });

            if (!account) {
                return res.status(404).json({ success: false, message: 'Không có tài khoản này!' });
            }

            // Kiểm tra mật khẩu
            const comparePassword = await bcrypt.compare(data.password, account.PASSWORD);
            if (!comparePassword) {
                return res.status(401).json({ success: false, message: 'Mật khẩu không đúng!' });
            }

            const role = await models.ROLE.findOne({ where: { ROLE_ID: account.ROLE_ID } });
            const staff = await models.STAFF.findOne({ where: { ACCOUNT_ID: account.ACCOUNT_ID } });
            const customer = await models.CUSTOMER.findOne({ where: { ACCOUNT_ID: account.ACCOUNT_ID } });

            // Tạo token
            const tokenPayload = {
                accountId: account.ACCOUNT_ID,
                role: role.NAME,
                idPerson: staff ? staff.STAFF_ID : customer ? customer.CUSTOMER_ID : null,
            };

            const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });

            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công!',
                token,
                user: {
                    username: account.USERNAME,
                    role: role.NAME,
                    idPerson: tokenPayload.idPerson,
                    accountId: tokenPayload.accountId,
                },
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // [POST] /api/accounts/logout
    async doLogout(req, res) {
        return res.status(200).json({ success: true, message: 'Đăng xuất thành công!' });
    }
}

module.exports = new AuthController();
