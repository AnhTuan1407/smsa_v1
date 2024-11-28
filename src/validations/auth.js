module.exports = {
    registerPost: (req, res, next) => {
        const errors = [];

        if (!req.body.username) {
            errors.push("Tên đăng nhập không được để trống!");
        }

        if (!req.body.password) {
            errors.push("Mật khẩu không được để trống!");
        }

        if (!req.body.phoneNumber) {
            errors.push("Số điện thoại không được để trống!");
        }

        if (!req.body.name) {
            errors.push("Họ và tên không được để trống!");
        }

        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        next();
    },

    loginPost: (req, res, next) => {
        const errors = [];

        if (!req.body.username) {
            errors.push("Tên đăng nhập không được để trống!");
        }

        if (!req.body.password) {
            errors.push("Mật khẩu không được để trống!");
        }

        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        next();
    }
};
