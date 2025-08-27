const express = require('express');
const app = express();

// IMPORT RUTES
const userRoutes = require('./users.routes.js');

// USE ROUTES
app.use('/users',userRoutes);

module.exports = app;
