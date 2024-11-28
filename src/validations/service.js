module.exports.createValidation = (req, res, next) => {
    const errors = [];

    if (!req.body.name) {
        errors.push("Tên dịch vụ không được để trống!");
    }

    if (!req.body.description) {
        errors.push("Mô tả không được để trống!");
    }

    if (!req.body.price) {
        errors.push("Giá không được để trống!");
    }

    if (!req.body.estimateTime) {
        errors.push("Thời gian ước tính không được để trống!");
    }

    if (!req.file) {
        errors.push("Hình ảnh không được để trống!");
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    next();
};


module.exports.editValidation = (req, res, next) => {
    const errors = [];

    if (!req.body.name) {
        errors.push("Tên dịch vụ không được để trống!");
    }

    if (!req.body.description) {
        errors.push("Mô tả không được để trống!");
    }

    if (!req.body.price) {
        errors.push("Giá không được để trống!");
    }

    if (!req.body.estimateTime) {
        errors.push("Thời gian ước tính không được để trống!");
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    next();
};

