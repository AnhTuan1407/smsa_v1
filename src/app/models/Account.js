
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ACCOUNT', {
        ACCOUNT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        USERNAME: {
            type: DataTypes.STRING(50),
        },
        PASSWORD: {
            type: DataTypes.STRING(50),
        },
        ROLE_ID: {
            type: DataTypes.INTEGER,
        }

    }, {
        tableName: 'ACCOUNT',
        paranoid: true, // Kích hoạt xóa mềm
        timestamps: true,  // Bật timestamps để tự động thêm createdAt và updatedAt
        schema: 'dbo',
    });
}