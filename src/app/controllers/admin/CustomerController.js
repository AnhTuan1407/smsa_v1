const initialModelSqlServer = require('../../models/initial-models');
const db = require('../../models/index');
const models = initialModelSqlServer(db);

class CustomerController {
    //[GET] /api/customers/findAll
    async showAllCustomer(req, res, next) {
        try {
            const customers = await models.CUSTOMER.findAll();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[POST] /api/customers/create
    async doCreate(req, res, next) {
        try {
            const data = req.body;

            const newCustomer = await models.CUSTOMER.create({
                NAME: data.name,
                EMAIL: data.email,
                PHONE: data.phoneNumber,
                ADDRESS: data.address,
                DATE_OF_BIRTH: data.dateOfBirth,
                GENDER: data.gender,
                POINTS: 0,
            });

            res.status(201).json({
                message: "Thêm khách hàng thành công!",
                customer: newCustomer,
            });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[GET] /api/customers/detail/:id
    async showDetail(req, res, next) {
        try {
            const id = req.params.id;
            const customer = await models.CUSTOMER.findOne({
                where: { CUSTOMER_ID: id },
            });

            if (!customer) {
                return res.status(404).json({ message: "Không tìm thấy khách hàng!" });
            }

            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[PUT] /api/customers/edit/:id
    async doEdit(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;

            const [updatedRowsCount] = await models.CUSTOMER.update({
                NAME: data.name,
                EMAIL: data.email,
                PHONE: data.phoneNumber,
                ADDRESS: data.address,
                DATE_OF_BIRTH: data.dateOfBirth,
                GENDER: data.gender,
                POINTS: data.points,
                ACCOUNT_ID: data.accountId,
            }, { where: { CUSTOMER_ID: id } });

            if (updatedRowsCount > 0) {
                res.status(200).json({ message: "Chỉnh sửa khách hàng thành công!" });
            } else {
                res.status(404).json({ message: "Không tìm thấy khách hàng để chỉnh sửa!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[DELETE] /api/customers/delete/:id
    async doDelete(req, res, next) {
        try {
            const id = req.params.id;

            const deletedRowsCount = await models.CUSTOMER.destroy({
                where: { CUSTOMER_ID: id }
            });

            if (deletedRowsCount > 0) {
                res.status(200).json({ message: "Xóa khách hàng thành công!" });
            } else {
                res.status(404).json({ message: "Không tìm thấy khách hàng để xóa!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }
}

module.exports = new CustomerController();
