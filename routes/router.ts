const router = require('express').Router();
const auth = require('./auth');
const project = require('./project');
const task = require('./task');
const user = require('./user');
const contact = require('./contact');
const ai = require('./ai');

import {sendEmail} from '../src/controllers/emailController';


router.get('/', (req, res) => {
  res.send('Test endpoint');
});

router.use('/auth/', auth);
router.use('/project/', project);
router.use('/task/', task);
router.use('/user/', user);
router.use('/contact/', contact);
router.use('/ai/', ai);

router.post('/email', sendEmail);

module.exports = router;


