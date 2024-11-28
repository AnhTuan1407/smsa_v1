module.exports = function (sequelize, Datatypes) {
    return sequelize.define("SERVICE", {
        SERVICE_ID: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NAME: {
            type: Datatypes.STRING(255),
        },
        DESCRIPTION: {
            type: Datatypes.TEXT,
        },
        PRICE: {
            type: Datatypes.INTEGER,
        },
        IMAGE: {
            type: Datatypes.TEXT,
        },
        ESTIMATE_TIME: {
            type: Datatypes.FLOAT,
        },
        SUB_CATEGORY_ID: {
            type: Datatypes.INTEGER,
        }
    }, {
        tableName: "SERVICE",
        schema: 'dbo',
        timestamps: true,
        paranoid: true,
    })
}