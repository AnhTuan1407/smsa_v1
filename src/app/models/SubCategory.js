module.exports = function (sequelize, DataTypes) {
    return sequelize.define("SUB_CATEGORY", {
        SUB_CATEGORY_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        CATEGORY_ID: {
            type: DataTypes.INTEGER,
        },
        NAME: {
            type: DataTypes.STRING(100),
        },
        DESCRIPTION: {
            type: DataTypes.TEXT,
        },
        IMAGE: {
            type: DataTypes.TEXT,
        }
    }, {
        tableName: 'SUB_CATEGORY',
        paranoid: true, // Kích hoạt xóa mềm
        timestamps: true,  // Bật timestamps để tự động thêm createdAt và updatedAt
        schema: 'dbo',
    })
}