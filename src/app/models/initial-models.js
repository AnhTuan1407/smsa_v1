const DataTypes = require("sequelize").DataTypes;

const _ACCOUNT = require('./Account');
const _ROLE = require('./Role');
const _STAFF = require('./Staff');
const _CUSTOMER = require('./Customer');
const _SERVICE = require('./Service');

function initialModelSqlServer(sequelize) {
    const ACCOUNT = _ACCOUNT(sequelize, DataTypes);
    const ROLE = _ROLE(sequelize, DataTypes);
    const STAFF = _STAFF(sequelize, DataTypes);
    const CUSTOMER = _CUSTOMER(sequelize, DataTypes);
    const SERVICE = _SERVICE(sequelize, DataTypes);

    return {
        ACCOUNT,
        ROLE,
        STAFF,
        CUSTOMER,
        SERVICE,
    }
}

module.exports = initialModelSqlServer;