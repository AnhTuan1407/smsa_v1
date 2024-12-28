const DataTypes = require("sequelize").DataTypes;

const _ACCOUNT = require('./Account');
const _ROLE = require('./Role');
const _STAFF = require('./Staff');
const _CUSTOMER = require('./Customer');
const _SERVICE = require('./Service');
const _CATEGORY = require('./Category');
const _SUB_CATEGORY = require('./SubCategory');
const _LOCATION = require('./Location');
const _SHIFT = require('./Shift');
const _SCHEDULE = require('./Schedule');
const _NOTIFICATION = require('./Notification');
const _APPOINTMENT = require('./Appointment');
const _APPOINTMENT_DETAIL = require('./AppointmentDetail');

function initialModelSqlServer(sequelize) {
    const ACCOUNT = _ACCOUNT(sequelize, DataTypes);
    const ROLE = _ROLE(sequelize, DataTypes);
    const STAFF = _STAFF(sequelize, DataTypes);
    const CUSTOMER = _CUSTOMER(sequelize, DataTypes);
    const SERVICE = _SERVICE(sequelize, DataTypes);
    const CATEGORY = _CATEGORY(sequelize, DataTypes);
    const SUB_CATEGORY = _SUB_CATEGORY(sequelize, DataTypes);
    const LOCATION = _LOCATION(sequelize, DataTypes);
    const SHIFT = _SHIFT(sequelize, DataTypes);
    const SCHEDULE = _SCHEDULE(sequelize, DataTypes);
    const NOTIFICATION = _NOTIFICATION(sequelize, DataTypes);
    const APPOINTMENT = _APPOINTMENT(sequelize, DataTypes);
    const APPOINTMENT_DETAIL = _APPOINTMENT_DETAIL(sequelize, DataTypes);

    return {
        ACCOUNT,
        ROLE,
        STAFF,
        CUSTOMER,
        SERVICE,
        CATEGORY,
        SUB_CATEGORY,
        LOCATION,
        SHIFT,
        SCHEDULE,
        NOTIFICATION,
        APPOINTMENT,
        APPOINTMENT_DETAIL,
    }
}

module.exports = initialModelSqlServer;