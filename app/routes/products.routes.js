const express = require('express');
const router = express.Router();
const Products = require('../controllers/products.controller');

// POST CREATE PRODUCT
router.post('/', Products.createProduct);
// POST GET ALL PRODUCTS
router.get('/', Products.getProducts);

module.exports = router;
