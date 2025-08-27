const { json } = require('body-parser');
const express = require('express');
const app = express();
const data = require('./src/data/data.json');
app.use(express.json());
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
app.get('/api/v1/users/:id/', function(req, res) {
  const id = req.params.id;
  const response = { error: true, msg: 'invalid data', data: null };

  const user = data.find(u => +u.id === +id);
  if (user) {
    response.error = false;
    response.msg = 'todo ok';
    response.data = user;
  }
  res.json(response);
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


// POST USER
app.post('/api/v1/users', function(req,res){
  const currentData = data;
  const response = {error: false, msg: 'todo ok',data: null};
  if(req.body.name && req.body.age){
    const dataSave = {
      id: currentData.length+1,
      name : req.body.name,
      age : req.body.age,

    };
    currentData.push(dataSave);
    fs.writeFile('./src/data/data.json', JSON.stringify(currentData), (err) =>{
      response.error = true;
      response.msg =  'Server Error';
    });
    response.data = dataSave;
  } else{
    response.error = true;
    response.msg = 'invalid data';
  }
  res.json(response)
});




app.listen(port);