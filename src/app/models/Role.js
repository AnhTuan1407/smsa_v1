module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ROLE', {
        ROLE_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NAME: {
            type: DataTypes.STRING(255),
        },
    }, {
        tableName: 'ROLE',
        timestamps: false,  // Bật timestamps để tự động thêm createdAt và updatedAt
        schema: 'dbo',
    });
}