const express = require('express');
const app = express();

// IMPORT RUTES
const userRoutes = require('./users.routes');
const productRoutes = require('./products.routes')
// USE ROUTES
app.use('/users',userRoutes);
app.use('/products', productRoutes)

module.exports = app;
