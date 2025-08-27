const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255), // encriptada con bcrypt
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Administrador', 'Cliente'),
    defaultValue: 'Cliente'
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
