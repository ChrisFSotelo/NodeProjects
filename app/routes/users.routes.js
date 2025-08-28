const express = require('express');
const router = express.Router();
const Users = require('../controllers/user.controller');

// POST CREATE USER
router.post('/', Users.createUser);
// POST LOGIN USER
router.post('/login', Users.loginUser);

module.exports = router;
