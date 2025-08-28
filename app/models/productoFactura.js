const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const ProductoFactura = sequelize.define('ProductoFactura', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    facturaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioVenta: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
}, {
    tableName: 'producto_factura',
    timestamps: false
});

module.exports = ProductoFactura;
