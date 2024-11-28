
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('CUSTOMER', {
        CUSTOMER_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NAME: {
            type: DataTypes.STRING(255),
        },
        EMAIL: {
            type: DataTypes.STRING(255),
        },
        PHONE: {
            type: DataTypes.STRING(50),
        },
        ADDRESS: {
            type: DataTypes.STRING(255),
        },
        DATE_OF_BIRTH: {
            type: DataTypes.DATE,
        },
        GENDER: {
            type: DataTypes.STRING(50),
        },
        POINTS: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        ACCOUNT_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'CUSTOMER',
        paranoid: true, // Kích hoạt xóa mềm
        timestamps: true,  // Bật timestamps để tự động thêm createdAt và updatedAt
        schema: 'dbo',
    });
}