  // app/models/index.js
  const sequelize = require('./sequelize');

  // Importar modelos
  const User = require('./users');
  const Products = require('./products');
  const Facturas = require('./facturas')
  const ProductoFactura = require('./productoFactura');

// Un usuario (cliente) puede tener muchas facturas
User.hasMany(Facturas, { foreignKey: 'clienteId', as: 'facturas' });
// Cada factura pertenece a un usuario
Facturas.belongsTo(User, { foreignKey: 'clienteId', as: 'cliente' });
// Una factura puede tener varios productos y un producto puede aparecer en varias facturas
Facturas.belongsToMany(Products, { through: ProductoFactura, foreignKey: 'facturaId', as: 'productos' });
// Un producto puede estar en varias facturas y cada factura puede contener varios productos
Products.belongsToMany(Facturas, { through: ProductoFactura, foreignKey: 'productoId', as: 'facturas' });


module.exports = {
  sequelize,
  User,
  Products,
  Facturas,
  ProductoFactura
};
