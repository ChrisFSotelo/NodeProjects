const express = require('express');
const router = express.Router();
const FacturasController = require('../controllers/facturas.controller');

router.post('/', FacturasController.createFactura);
router.get('/', FacturasController.getFacturas);

module.exports = router;
