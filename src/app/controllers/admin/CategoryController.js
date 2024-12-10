const db = require('../../models/index');
const initSQLModels = require('../../models/initial-models');
const models = initSQLModels(db);


class CatergoryController {

    //[GET] /api/admin/category/findAll
    async showAllCategory(req, res, next) {
        try {
            const data = await models.CATEGORY.findAll({});
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[POST] /api/admin/category/create
    async doCreate(req, res, next) {
        try {
            const data = req.body;

            const newCategory = await models.CATEGORY.create({
                NAME: data.name,
            })

            res.status(201).json({ category: newCategory, message: "Thêm danh mục mới thành công!", success: true })
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[PUT] /api/admin/category/edit/:id
    async doEdit(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;

            const [updatedRowsCount] = await models.CATEGORY.update({
                NAME: data.name,
            }, { where: { CATEGORY_ID: id } });

            if (updatedRowsCount > 0) {
                res.status(200).json({ message: "Chỉnh sửa danh mục thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy danh mục này!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[PUT] /api/admin/category/detail/:id
    async showDetail(req, res, next) {
        try {
            const id = req.params.id;

            const category = await models.CATEGORY.findOne({
                where: { CATEGORY_ID: id },
            })

            if (category) {
                res.status(200).json({ category, success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy danh mục này!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[DELETE] /api/admin/category/delete/:id
    async doDelete(req, res, next) {
        try {
            const id = req.params.id;

            const deletedRowsCount = await models.CATEGORY.destroy({
                where: { CATEGORY_ID: id },
            })

            if (deletedRowsCount > 0) {
                res.status(200).json({ message: "Xóa danh mục thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy danh mục này!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }
}

module.exports = new CatergoryController();