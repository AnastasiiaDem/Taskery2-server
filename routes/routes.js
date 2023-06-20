const routes = require('express').Router();
const auth = require('./auth');
const project = require('./project');
const task = require('./task');
const user = require('./user');
const contact = require('./contact');
const ai = require('./ai');

import {sendEmail} from '../src/controllers/emailController';


routes.get('/', (req, res) => {
  res.send('Test endpoint');
});

routes.use('/auth/', auth);
routes.use('/project/', project);
routes.use('/task/', task);
routes.use('/user/', user);
routes.use('/contact/', contact);
routes.use('/ai/', ai);

routes.post('/email', sendEmail);

module.exports = routes;


