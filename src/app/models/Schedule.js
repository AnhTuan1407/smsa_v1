module.exports = function (sequelize, DataTypes) {
    return sequelize.define("SCHEDULE", {
        SCHEDULE_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        STAFF_ID: {
            type: DataTypes.INTEGER,
        },
        WORK_DATE: {
            type: DataTypes.DATE,
        },
        SHIFT_ID: {
            type: DataTypes.INTEGER,
        },
    }, {
        tableName: "SCHEDULE",
        timestamps: true,
        paranoid: true,
        schema: 'dbo',
    })
}