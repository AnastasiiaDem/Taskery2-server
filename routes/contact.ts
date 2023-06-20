import {deleteRequest, getRequests, sendRequest, sendRespond} from '../src/controllers/contactController';

const contact = require('express').Router();

contact.get('/', (req, res) => {
  res.send('contact');
});

contact.post('/request', sendRequest);
contact.post('/respond', sendRespond);
contact.get('/getRequests', getRequests);
contact.delete('/request/delete/:id', deleteRequest);

module.exports = contact;
