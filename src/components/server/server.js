import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'tasks.json');

// Load tasks from file
let tasks = [];
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf8');
  tasks = JSON.parse(data);
}

// Save tasks to file
const saveTasks = () => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf8');
};

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = { id: uuidv4(), ...req.body, author: "" };
  tasks.push(newTask);
  saveTasks();
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task));
  saveTasks();
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
