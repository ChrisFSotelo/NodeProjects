const sequelize = require('./sequelize'); 
const { DataTypes } = require('sequelize');

const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  lote: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  available_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  entry_date:{
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Products;
