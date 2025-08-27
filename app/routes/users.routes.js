const express = require('express');
const router = express.Router();
const Users = require('../controllers/user.controller');

// // GET USER ALL
// router.get('/', Users.getAllUsers);
// // GET USER BY ID
// router.get('/:id', Users.getUserById);
// // POST USER
router.post('/', Users.createUser);
// // DELETE USER
// router.delete('/:id', Users.DeleteUserById);

module.exports = router;
