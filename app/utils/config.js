const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

const data = dotenv.config({
  path: path.resolve(__dirname, `../../environment/${envFile}`)
});

module.exports = {
  PORT: data.parsed.PORT,
  API: data.parsed.ROOT_API
};
