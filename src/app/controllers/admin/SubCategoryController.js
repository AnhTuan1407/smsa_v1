const initialModelSqlServer = require('../../models/initial-models');
const db = require('../../models/index');
const models = initialModelSqlServer(db);

const multer = require('multer');
const fs = require('fs');

// Khởi tạo multer để lưu file tạm thời
const upload = multer({ dest: 'uploads/' });

class SubCategoryController {
    //[GET] /api/subCategory/findAll
    async showAll(req, res, next) {
        try {
            const subCategories = await models.SUB_CATEGORY.findAll();
            res.status(200).json({ success: true, data: subCategories });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error });
        }
    }

    //[POST] /api/subCategory/create
    async doCreate(req, res, next) {
        try {
            const { name, categoryId, description } = req.body;
            const imageFile = req.file;

            // Đọc file và chuyển thành base64
            const imageBase64 = imageFile
                ? fs.readFileSync(imageFile.path, { encoding: 'base64' })
                : null;

            const newSubCategory = await models.SUB_CATEGORY.create({
                NAME: name,
                CATEGORY_ID: categoryId,
                IMAGE: imageBase64,
                DESCRIPTION: description,
            });

            // Xóa file tạm sau khi đã chuyển đổi
            if (imageFile) fs.unlinkSync(imageFile.path);

            res.status(201).json({
                success: true,
                message: "Thêm danh mục con thành công!",
                data: newSubCategory,
            });
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[GET] /api/subCategory/detail/:id
    async showDetail(req, res, next) {
        try {
            const id = req.params.id;
            const subCategory = await models.SUB_CATEGORY.findOne({
                where: { SUB_CATEGORY_ID: id },
            });

            if (!subCategory) {
                return res.status(404).json({ message: "Không tìm thấy danh mục con này!" });
            }

            res.status(200).json(subCategory);
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[PUT] /api/subCategory/edit/:id
    async doEdit(req, res, next) {
        try {
            const id = req.params.id;

            const { name, categoryId, description } = req.body;

            const subCategoryFetch = await models.SUB_CATEGORY.findOne({ where: { SUB_CATEGORY_ID: id } });

            if (!subCategoryFetch) {
                return res.status(404).json({ success: false, message: "Không tìm thấy danh mục phụ!" });
            }

            let imageBase64 = subCategoryFetch.IMAGE;

            if (req.file) {
                const imageFile = req.file;
                imageBase64 = fs.readFileSync(imageFile.path, { encoding: 'base64' });
                fs.unlinkSync(imageFile.path);
            }

            const [updatedRowsCount] = await models.SUB_CATEGORY.update({
                NAME: name,
                CATEGORY_ID: categoryId,
                IMAGE: imageBase64,
                DESCRIPTION: description,
            }, { where: { SUB_CATEGORY_ID: id } });

            if (updatedRowsCount > 0) {
                res.status(200).json({ message: "Chỉnh sửa danh mục phụ thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy danh mục phụ này!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }

    //[DELETE] /api/subCategory/delete/:id
    async doDelete(req, res, next) {
        try {
            const id = req.params.id;

            const deleteService = await models.SERVICE.destroy({
                where: { SUB_CATEGORY_ID: id }
            });

            const deletedRowsCount = await models.SUB_CATEGORY.destroy({
                where: { SUB_CATEGORY_ID: id }
            });

            if (deletedRowsCount > 0) {
                res.status(200).json({ message: "Xóa danh mục phụ thành công!", success: true });
            } else {
                res.status(404).json({ message: "Không tìm thấy danh mục phụ này!", success: false });
            }
        } catch (error) {
            res.status(500).json({ message: "Có lỗi xảy ra!", error, success: false });
        }
    }
}

module.exports = new SubCategoryController();
