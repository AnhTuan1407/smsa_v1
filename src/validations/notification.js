module.exports.notificationForm = (req, res, next) => {
    if (!req.body.subject) {
        req.flash("error", `Tiêu đề không được để trống!`);
        res.redirect("back");
        return;
    }

    if (!req.body.message) {
        req.flash("error", `Nội dung không được để trống!`);
        res.redirect("back");
        return;
    }

    if (!req.body.recipients) {
        req.flash("error", `Thông tin người nhận không được để trống!`);
        res.redirect("back");
        return;
    }

    next();
}