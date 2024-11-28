module.exports.staffValidation = (req, res, next) => {
    if (!req.body.name) {
        req.flash("error", `Tên nhân viên không được để trống!`);
        res.redirect("back");
        return;
    }

    if (!req.body.email) {
        req.flash("error", `Email nhân viên không được để trống!`);
        res.redirect("back");
        return;
    }

    if (!req.body.gender) {
        req.flash("error", `Giới tính không được để trống!`);
        res.redirect("back");
        return;
    }

    if (!req.body.address) {
        req.flash("error", `Địa chỉ nhân viên không được để trống!`);
        res.redirect("back");
        return;
    }

    if (!req.body.phone) {
        req.flash("error", `Số điện thoại nhân viên không được để trống!`);
        res.redirect("back");
        return;
    }

    if (!req.body.role) {
        req.flash("error", `Vai trò nhân viên không được để trống!`);
        res.redirect("back");
        return;
    }

    if (!req.body.locationId) {
        req.flash("error", `Cơ sở làm việc không được để trống!`);
        res.redirect("back");
        return;
    }

    next();
}