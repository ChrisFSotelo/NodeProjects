const express = require('express');
const cors = require('cors');

//ROUTES
const userRoutes = require('./app/routes/users.routes.js')

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users',userRoutes);

//puerto
app.listen(8000);