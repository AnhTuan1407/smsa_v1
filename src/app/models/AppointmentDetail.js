
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('APPOINTMENT_DETAIL', {
        DETAIL_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        APPOINTMENT_ID: {
            type: DataTypes.INTEGER,
        },
        SERVICE_ID: {
            type: DataTypes.INTEGER,
        },
    }, {
        tableName: 'APPOINTMENT_DETAIL',
        paranoid: true, // Kích hoạt xóa mềm
        timestamps: true,  // Bật timestamps để tự động thêm createdAt và updatedAt
        schema: 'dbo',
    });
}