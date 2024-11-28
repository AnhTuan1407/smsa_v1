const Sequelize = require('sequelize');
const connect = require('../../config/db/index');

const db = new Sequelize(connect.development);

module.exports = db;