const { json } = require('body-parser');
const express = require('express');
const app = express();

const fs = require('fs');

//ubicacion del documento
const path = require('path')
//puerto
const port = 8000;

const currentDir = path.join(__dirname, 'src/data/');
const currentFile = `${currentDir}data.json`;

// GET USER ALL

app.get('/api/v1/users', function(req,res){
  //parsear la respuesta
  const rawData = fs.readFileSync(currentFile);
  const response = JSON.parse(rawData);
  
    res.json({data: response});
})

// GET USER BY ID
app.get('/api/v1/users/:id/', function(req,res){
  const id = req.params.id;

  const rawData = fs.readFileSync(currentFile);
  const jsonFile =  JSON.parse(rawData);
  const response = jsonFile.find(u => + u.id === +id);
  res.json({data: response});
});

// SEARCH USER BY ID
app.get('/api/v1/search', function(req,res){
  const id = req.query.id;
  const name = req.query.name;
  const rawData = fs.readFileSync(currentFile);
  const jsonFile =  JSON.parse(rawData);
  const response = jsonFile.filter(u => {
    if (+u.id === +id) return true;
  })
  res.json({data: response});
});


app.listen(port);