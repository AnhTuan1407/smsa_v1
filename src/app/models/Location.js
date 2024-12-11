module.exports = function (sequelize, DataTypes) {
    return sequelize.define("LOCATION", {
        LOCATION_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        NAME: {
            type: DataTypes.STRING(255),
        }
    }, {
        tableName: 'LOCATION',
        paranoid: true,
        timestamps: true,
        schema: 'dbo',
    })
}