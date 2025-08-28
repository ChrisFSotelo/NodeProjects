const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_DIALECT } = require('../utils/config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false
});

module.exports = sequelize; 