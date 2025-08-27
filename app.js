const { json } = require('body-parser');
const express = require('express');
const app = express();

const fs = require('fs');

//ubicacion del documento
const path = require('path')
//puerto
const port = 8000;

app.get('/api/v1/users', function(req,res){
  const currentDir = path.join(__dirname, 'src/data/');
  const currentFile = `${currentDir}data.json`;

  //parsear la respuesta
  const rawData = fs.readFileSync(currentFile);
  const response = JSON.parse(rawData);
  
    res.json({data: response});
})

app.listen(port);