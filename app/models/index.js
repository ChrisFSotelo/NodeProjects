// app/models/index.js
const sequelize = require('./sequelize');

// Importar modelos
const User = require('./users');

// Definir relaciones (ejemplo futuro)
// User.hasOne(Cliente, { foreignKey: 'userId' });
// User.hasOne(Admin, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  // Cliente,
  // Admin
};
