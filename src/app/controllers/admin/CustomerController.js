const initialModelSqlServer = require('../../models/initial-models');
const db = require('../../models/index');
const models = initialModelSqlServer(db);

class CustomerController {
    //[GET] /api/admin/customers/findAll
    async showAllCustomer(req, res, next) {
        try {
            const customers = await models.CUSTOMER.findAll();
            res.status(200).json({ success: true, data: customers });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[POST] /api/admin/customers/create
    async doCreate(req, res, next) {
        try {
            const data = req.body;

            const newCustomer = await models.CUSTOMER.create({
                NAME: data.name,
                EMAIL: data.email,
                PHONE: data.phone,
                ADDRESS: data.address,
                DATE_OF_BIRTH: data.dateOfBirth,
                GENDER: data.gender,
                POINTS: 0,
            });

            res.status(201).json({
                message: "Thêm khách hàng thành công!",
                customer: newCustomer,
                success: true
            });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[GET] /api/admin/customers/detail/:id
    async showDetail(req, res, next) {
        try {
            const id = req.params.id;
            const customer = await models.CUSTOMER.findOne({
                where: { CUSTOMER_ID: id },
            });

            if (!customer) {
                return res.status(404).json({ message: "Không tìm thấy khách hàng!", success: false });
            }

            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[PUT] /api/admin/customers/edit/:id
    async doEdit(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;

            const [updatedRowsCount] = await models.CUSTOMER.update({
                NAME: data.name,
                EMAIL: data.email,
                PHONE: data.phone,
                ADDRESS: data.address,
                DATE_OF_BIRTH: data.dateOfBirth,
                GENDER: data.gender,
                POINTS: data.points,
                ACCOUNT_ID: data.accountId,
            }, { where: { CUSTOMER_ID: id } });

            if (updatedRowsCount > 0) {
                res.status(200).json({ message: "Chỉnh sửa khách hàng thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy khách hàng để chỉnh sửa!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[DELETE] /api/admin/customers/delete/:id
    async doDelete(req, res, next) {
        try {
            const id = req.params.id;

            const customer = await models.CUSTOMER.findOne({
                where: { CUSTOMER_ID: id }
            });

            const deleteRowsAccount = await models.ACCOUNT.destroy({
                where: { ACCOUNT_ID: customer.ACCOUNT_ID }
            })

            const deletedRowsCount = await models.CUSTOMER.destroy({
                where: { CUSTOMER_ID: id }
            });

            if (deletedRowsCount > 0 && deleteRowsAccount > 0) {
                res.status(200).json({ message: "Xóa khách hàng thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy khách hàng này!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[PUT] /api/admin/customers/edit
    async edit(req, res, next) {
        try {
            const data = req.body;

            const [updatedRowsCount] = await models.CUSTOMER.update({
                NAME: data.NAME,
                EMAIL: data.EMAIL,
                PHONE: data.PHONE,
                ADDRESS: data.ADDRESS,
                DATE_OF_BIRTH: data.DATE_OF_BIRTH,
                POINTS: data.POINTS,
                ACCOUNT_ID: data.ACCOUNT_ID,
            }, { where: { CUSTOMER_ID: data.CUSTOMER_ID } });

            if (updatedRowsCount > 0) {
                res.status(200).json({ message: "Chỉnh sửa khách hàng thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy khách hàng để chỉnh sửa!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }
}

module.exports = new CustomerController();
