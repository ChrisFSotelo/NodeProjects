const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta absoluta al JSON
const currentFile = path.join(__dirname, '../../src/data/data.json');

// Helper para leer JSON siempre fresco
function readData() {
  const rawData = fs.readFileSync(currentFile);
  return JSON.parse(rawData);
}

// GET USER ALL
router.get('/', (req, res) => {
  const response = readData();
  res.json({ data: response });
});

// GET USER BY ID
router.get('/:id', (req, res) => {
  const id = +req.params.id;
  const users = readData();
  const user = users.find(u => u.id === id);

  if (user) {
    res.json({ error: false, msg: 'todo ok', data: user });
  } else {
    res.json({ error: true, msg: 'invalid data', data: null });
  }
});

// SEARCH USER BY ID OR NAME
router.get('/search', (req, res) => {
  const { id, name } = req.query;
  const users = readData();

  const response = users.filter(u => {
    if (id && +u.id === +id) return true;
    if (name && u.name.toLowerCase().includes(name.toLowerCase())) return true;
    return false;
  });

  res.json({ data: response });
});

// POST USER
router.post('/', (req, res) => {
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
});

// DELETE USER
router.delete('/:id', (req, res) => {
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
});

module.exports = router;
