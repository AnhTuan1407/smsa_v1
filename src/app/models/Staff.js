module.exports = function (sequelize, DataTypes) {
    return sequelize.define('STAFF', {
        STAFF_ID: {
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
        GENDER: {
            type: DataTypes.STRING(50),
        },
        PHONE: {
            type: DataTypes.STRING(50),
        },
        ADDRESS: {
            type: DataTypes.STRING(255),
        },
        IMAGE: {
            type: DataTypes.TEXT,
        },
        ROLE: {
            type: DataTypes.STRING(50),
        },
        RATING: {
            type: DataTypes.INTEGER,
        },
        LOCATION_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ACCOUNT_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'STAFF',
        paranoid: true,  // Kích hoạt xóa mềm
        timestamps: true,  // Bật timestamps để tự động thêm createdAt, updatedAt và deletedAt
        schema: 'dbo',
    });
};
