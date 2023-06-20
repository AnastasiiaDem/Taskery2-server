import createUser from '../src/controllers/registerController';
import loginUser from '../src/controllers/loginController';
import logoutUser from '../src/controllers/logoutController';
import refreshToken from '../src/controllers/refreshTokenController';

const auth = require("express").Router();

auth.get('/', (req, res) => {
  res.send('AUTH');
});

auth.post('/register', createUser);
auth.post('/login', loginUser);
auth.get('/logout', logoutUser);
auth.get('/refresh', refreshToken);

module.exports = auth;