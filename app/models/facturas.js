const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Factura = sequelize.define('Factura', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subtotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    iva: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    clienteId: {  // este será el id del usuario que compró
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'facturas',
    timestamps: true
});

module.exports = Factura;
