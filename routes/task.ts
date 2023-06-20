import {createTask, deleteTask, getTasks, updateTask} from '../src/controllers/taskController';

const task = require('express').Router();

task.get('/', (req, res) => {
  res.send('TASK');
});

task.get('/all', getTasks);
task.post('/create', createTask);
task.put('/update/:id', updateTask);
task.delete('/delete/:id', deleteTask);

module.exports = task;
