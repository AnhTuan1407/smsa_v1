const db = require('../../models/index');
const initialModelsSQLServer = require('../../models/initial-models');
const models = initialModelsSQLServer(db);

const multer = require('multer');
const fs = require('fs');

// Khởi tạo multer để lưu file tạm thời
const upload = multer({ dest: 'uploads/' });

class ServiceController {
    //[GET] /api/admin/services/findAll
    async showAll(req, res, next) {
        try {
            const services = await models.SERVICE.findAll();
            res.status(200).json({ success: true, data: services });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Có lỗi xảy ra!" });
        }
    }

    //[POST] /api/admin/services/create
    async doCreate(req, res, next) {
        try {
            const { name, description, price, estimateTime, subCategoryId } = req.body;
            const imageFile = req.file;

            // Đọc file và chuyển thành base64
            const imageBase64 = imageFile
                ? fs.readFileSync(imageFile.path, { encoding: 'base64' })
                : null;

            // Tạo mới dịch vụ và lưu image dưới dạng base64
            const newService = await models.SERVICE.create({
                NAME: name,
                DESCRIPTION: description,
                SUB_CATEGORY_ID: subCategoryId,
                PRICE: price,
                ESTIMATE_TIME: estimateTime,
                IMAGE: imageBase64,
            });

            // Xóa file tạm sau khi đã chuyển đổi
            if (imageFile) fs.unlinkSync(imageFile.path);

            res.status(201).json({
                success: true,
                message: "Thêm dịch vụ thành công!",
                data: newService,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Có lỗi xảy ra!" });
        }
    }

    //[GET] /api/admin/services/detail/:id
    async showDetail(req, res, next) {
        try {
            const id = req.params.id;
            const service = await models.SERVICE.findOne({ where: { SERVICE_ID: id } });

            if (service) {
                res.status(200).json({ success: true, data: service });
            } else {
                res.status(404).json({ success: false, message: "Không tìm thấy dịch vụ!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Có lỗi xảy ra!" });
        }
    }

    //[PUT] /api/services/edit/:id
    async doEdit(req, res, next) {
        try {
            const { name, description, price, estimateTime, subCategoryId } = req.body;
            const id = req.params.id;

            const serviceFetch = await models.SERVICE.findOne({ where: { SERVICE_ID: id } });

            if (!serviceFetch) {
                return res.status(404).json({ success: false, message: "Không tìm thấy dịch vụ!" });
            }

            let imageBase64 = serviceFetch.IMAGE;
            
            if (req.file) {
                const imageFile = req.file;
                imageBase64 = fs.readFileSync(imageFile.path, { encoding: 'base64' });
                fs.unlinkSync(imageFile.path);
            }

            const [updatedRowsCount] = await models.SERVICE.update(
                {
                    NAME: name,
                    DESCRIPTION: description,
                    PRICE: price,
                    ESTIMATE_TIME: estimateTime,
                    SUB_CATEGORY_ID: subCategoryId,
                    IMAGE: imageBase64,
                },
                { where: { SERVICE_ID: id } }
            );

            if (updatedRowsCount > 0) {
                res.status(200).json({
                    success: true,
                    message: "Chỉnh sửa dịch vụ thành công!",
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Cập nhật thất bại!",
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Có lỗi xảy ra!" });
        }
    }

    //[DELETE] /api/admin/services/delete/:id
    async doDelete(req, res, next) {
        try {
            const id = req.params.id;

            const service = await models.SERVICE.findOne({ where: { SERVICE_ID: id } });
            if (!service) {
                return res.status(404).json({ success: false, message: "Không tìm thấy dịch vụ!" });
            }

            await models.SERVICE.destroy({ where: { SERVICE_ID: id } });
            res.status(200).json({ success: true, message: "Xóa dịch vụ thành công!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Có lỗi xảy ra!" });
        }
    }
}

module.exports = new ServiceController();
