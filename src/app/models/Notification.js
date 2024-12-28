module.exports = function (sequelize, DataTypes) {
    return sequelize.define('NOTIFICATION', {
        NOTIFICATION_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        TITLE: {
            type: DataTypes.STRING(255),
        },
        CONTENT: {
            type: DataTypes.TEXT,
        },
        ACCOUNT_ID: {
            type: DataTypes.INTEGER,
        },
        ACCOUNT_SEND_NOTIFICATION: {
            type: DataTypes.INTEGER,
        },
        STATUS: {
            type: DataTypes.BOOLEAN,
        },
        NOTIFICATION_TYPE: {
            type: DataTypes.STRING(50),
        }
    }, {
        tableName: 'NOTIFICATION',
        schema: 'dbo',
        paranoid: true,
        timestamps: true,
    })
}