/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './Task.css';
import Cookies from 'js-cookie';
import AddBar from '../AddBar/AddBar.jsx';

const formatDueDate = (date) => {
  const dueDateObj = new Date(date);
  const month = dueDateObj.getMonth() + 1;
  const day = dueDateObj.getDate();
  const hours = dueDateObj.getHours();
  const minutes = String(dueDateObj.getMinutes()).padStart(2, '0');
  return `${month}.${day} - ${hours}:${minutes}`;
};

const tasksJson = [
  {
    id: 1,
    task: "Learn about JSON",
    dueDate: new Date().toISOString(),
    author: "AqilCont"
  },
  {
    id: 2,
    task: "Create a quote machine",
    dueDate: new Date().toISOString(),
    author: "alta9"
  },
  {
    id: 3,
    task: "Understand the difference between JSON and XML",
    dueDate: new Date().toISOString(),
    author: "hejmaria"
  }
];

function Task() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = Cookies.get('tasks') ? JSON.parse(Cookies.get('tasks')) : tasksJson;
    return storedTasks.map(task => ({
      ...task,
      dueDate: formatDueDate(task.dueDate)
    }));
  });

  const [editingTask, setEditingTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [currentDueDate, setCurrentDueDate] = useState('');

  useEffect(() => {
    Cookies.set('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleEdit = (task) => {
    if (editingTask !== task) {
      setEditingTask(task);
      setIsEditing(true);
      setCurrentTask(task);
      setCurrentDueDate(task.dueDate);
    }
  };

  const handleSave = (task) => {
    const updatedTasks = tasks.map((t) => (t.id === task.id ? { ...t, task: currentTask.task, dueDate: currentDueDate } : t));
    setTasks(updatedTasks);
    setEditingTask(null);
    setIsEditing(false);
  };

  const handleRemove = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
  };

  const handleEditInputChange = (e) => {
    setCurrentTask({ ...currentTask, task: e.target.value });
  };

  const handleDueDateInputChange = (e) => {
    setCurrentDueDate(e.target.value);
  };

  const handleAddTask = (newTask) => {
    const newTaskObj = { id: tasks.length + 1, ...newTask, author: "" };
    setTasks([...tasks, newTaskObj]);
  };

  return (
    <>
      <AddBar onAddTask={(newTask) => handleAddTask(newTask)} />
      {tasks.map((task, index) => (
        <div key={index} className="task-container">
          {isEditing && editingTask === task ? (
            <>
              <input
                type="text"
                value={currentTask.task}
                onChange={handleEditInputChange}
              />
              <input
                type="text"
                value={currentDueDate}
                onChange={handleDueDateInputChange}
              />
            </>
          ) : (
            <>
              <div className="text">{task.task}</div>
              <div className="due-date">{task.dueDate}</div>
            </>
          )}
          <div className="btns">
            {isEditing && editingTask === task ? (
              <button className="save" onClick={() => handleSave(task)}>
                Save
              </button>
            ) : (
              <button className="edit" onClick={() => handleEdit(task)}>
                Edit
              </button>
            )}
            <button className="delete" onClick={() => handleRemove(task)}>
              -
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Task;