// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

const tasks = [
  { id: 1, text: 'Task 5' },
  { id: 2, text: 'Task 2' },
  { id: 3, text: 'Task 3' },
]; // initial tasks

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  task.id = tasks.length + 1;
  tasks.push(task);
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (task) {
    task.text = req.body.text;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((task) => task.id === parseInt(id));
  if (index!== -1) {
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});