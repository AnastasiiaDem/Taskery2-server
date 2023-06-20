import {getAIBudget, getAIProject, getAITask} from '../src/controllers/aiController';

const ai = require("express").Router();

ai.get('/', (req, res) => {
  res.send('AI');
});

ai.post('/project', getAIProject);
ai.post('/budget', getAIBudget);
ai.post('/task', getAITask);

module.exports = ai;
