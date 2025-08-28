const express = require('express');
const app = express();

// IMPORT RUTES
const userRoutes = require('./users.routes');
const productRoutes = require('./products.routes')
const facturaRoutes = require('./facturas.routes')
// USE ROUTES
app.use('/users',userRoutes);
app.use('/products', productRoutes)
app.use('/facturas', facturaRoutes)

module.exports = app;
