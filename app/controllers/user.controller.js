
const fs = require('fs');
const path = require('path');

// Ruta absoluta al JSON
const currentFile = path.join(__dirname, '../../src/data/data.json');

// Helper para leer JSON siempre fresco
function readData() {
  const rawData = fs.readFileSync(currentFile);
  return JSON.parse(rawData);
}

// OBTENER TODOS LOS USUARIOS
exports.getAllUsers = (req, res, next) =>{
  const response = readData();
  res.json({ data: response });
}

exports.getUserById = (req, res, next) =>{
  const id = +req.params.id;
  const users = readData();
  const user = users.find(u => u.id === id);

  if (user) {
    res.json({ error: false, msg: 'todo ok', data: user });
  } else {
    res.json({ error: true, msg: 'invalid data', data: null });
  }
}

exports.AddNewUser = (req, res, next)=>{
  const users = readData();
  const response = { error: false, msg: 'todo ok', data: null };

  if (req.body.name && req.body.age) {

    const dataSave = {
      id: users.length + 1,
      name: req.body.name,
      age: req.body.age,
    };
    users.push(dataSave);

    fs.writeFile(currentFile, JSON.stringify(users, null, 2), err => {
      if (err) {
        response.error = true;
        response.msg = 'Server Error';
      }
    });

    response.data = dataSave;
  } else {
    response.error = true;
    response.msg = 'invalid data';
  }

  res.json(response);
}

exports.DeleteUserById = (req, res, next) =>{
  let users = readData();
  const response = { error: false, msg: 'todo ok', id: null };

  if (users.some(user => +user.id === +req.params.id)) {
    users = users.filter(user => +user.id !== +req.params.id);
    response.id = req.params.id;

    fs.writeFile(currentFile, JSON.stringify(users, null, 2), err => {
      if (err) {
        response.error = true;
        response.msg = 'Server Error';
      }
    });
  } else {
    response.error = true;
    response.msg = 'invalid data';
  }

  res.json(response);
}