const routes = require('./app/routes');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
//puerto
app.listen(8000);