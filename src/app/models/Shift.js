module.exports = function (sequelize, DataTypes) {
    return sequelize.define("SHIFT", {
        SHIFT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NAME: {
            type: DataTypes.STRING(255),
        },
        START_TIME: {
            type: DataTypes.TIME,
        },
        END_TIME: {
            type: DataTypes.TIME,
        }
    }, {
        tableName: "SHIFT",
        timestamps: false,
        schema: 'dbo',
    })
}