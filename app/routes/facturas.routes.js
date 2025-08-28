const express = require('express');
const router = express.Router();
const FacturasController = require('../controllers/facturas.controller');

router.post('/', FacturasController.createFactura);
router.get('/', FacturasController.getFacturas);
router.get('/historial/:clienteId', FacturasController.getHistorialProductos);
router.get('/:clienteId/:facturaId', FacturasController.getFacturaPorId);
module.exports = router;
