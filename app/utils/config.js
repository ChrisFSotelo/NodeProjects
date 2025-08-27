const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

dotenv.config({
  path: path.resolve(__dirname, `../../environment/${envFile}`)
});


module.exports = {
  PORT: process.env.PORT,
  API: process.env.ROOT_API,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_DIALECT: process.env.DB_DIALECT
};
