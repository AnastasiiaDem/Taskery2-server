import {deleteUser, getAllUsers, getCurrentUser, updateUser} from '../src/controllers/userController';

const user = require('express').Router();

user.get('/', (req, res) => {
  res.send('USER');
});

user.get('/all', getAllUsers);
user.get('/current', getCurrentUser);
user.put('/update', updateUser);
user.delete('/delete/:id', deleteUser);

module.exports = user;
