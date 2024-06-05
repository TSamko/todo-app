/* eslint-disable */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [
  {
    id: uuidv4(),
    task: "Learn about JSON",
    dueDate: new Date().toISOString(),
    author: "AqilCont"
  },
  {
    id: uuidv4(),
    task: "Create a quote machine",
    dueDate: new Date().toISOString(),
    author: "alta9"
  },
  {
    id: uuidv4(),
    task: "Understand the difference between JSON and XML",
    dueDate: new Date().toISOString(),
    author: "hejmaria"
  }
];


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = { id: uuidv4(), ...req.body, author: "" };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
  res.json(updatedTask);
});


app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});