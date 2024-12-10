module.exports = function (sequelize, DataTypes) {
    return sequelize.define("CATEGORY", {
        CATEGORY_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        NAME: {
            type: DataTypes.STRING(100),
        }
    }, {
        tableName: 'CATEGORY',
        paranoid: true, // Kích hoạt xóa mềm
        timestamps: true,  // Bật timestamps để tự động thêm createdAt và updatedAt
        schema: 'dbo',
    })
}