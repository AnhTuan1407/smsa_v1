module.exports.customerValidation = (req, res, next) => {
    const errors = [];

    if (!req.body.name) {
        errors.push("Họ tên không được để trống!");
    }

    if (!req.body.email) {
        errors.push("Email không được để trống!");
    }

    if (!req.body.phone) {
        errors.push("Số điện thoại không được để trống!");
    }

    if (!req.body.address) {
        errors.push("Địa chỉ không được để trống!");
    }

    if (!req.body.gender) {
        errors.push("Giới tính không được để trống!");
    }

    if (!req.body.dateOfBirth) {
        errors.push("Ngày sinh không được để trống!");
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    next();
};
