
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('APPOINTMENT', {
        APPOINTMENT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CUSTOMER_ID: {
            type: DataTypes.INTEGER,
        },
        STAFF_ID: {
            type: DataTypes.INTEGER,
        },
        STATUS: {
            type: DataTypes.STRING(50),
        },
        DATE_BOOKING: {
            type: DataTypes.DATE,
        },
        TIME_BOOKING: {
            type: DataTypes.TIME,
        },
        TIME_END: {
            type: DataTypes.TIME,
        },
    }, {
        tableName: 'APPOINTMENT',
        paranoid: true, // Kích hoạt xóa mềm
        timestamps: true,  // Bật timestamps để tự động thêm createdAt và updatedAt
        schema: 'dbo',
    });
}