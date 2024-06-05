/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './Task.css';
import AddBar from '../AddBar/AddBar.jsx';

const formatDueDate = (date) => {
  const dueDateObj = new Date(date);
  const month = dueDateObj.getMonth() + 1;
  const day = dueDateObj.getDate();
  const hours = dueDateObj.getHours();
  const minutes = String(dueDateObj.getMinutes()).padStart(2, '0');
  return `${month}.${day} - ${hours}:${minutes}`;
};

function Task() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});
  const [currentDueDate, setCurrentDueDate] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched tasks:', data); // Debug log
        setTasks(data.map(task => ({
          ...task,
          dueDate: task.dueDate // Store the due date as ISO string
        })));
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleEdit = (task) => {
    if (editingTask !== task) {
      setEditingTask(task);
      setIsEditing(true);
      setCurrentTask(task);
      setCurrentDueDate(task.dueDate);
    }
  };

  const handleSave = (task) => {
    const updatedTask = { ...task, task: currentTask.task, dueDate: new Date(currentDueDate).toISOString() };
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
      .then(response => response.json())
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
        setEditingTask(null);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleRemove = (task) => {
    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'DELETE'
    }).then(() => {
      setTasks(tasks.filter(t => t.id !== task.id));
    }).catch(error => console.error('Error deleting task:', error));
  };

  const handleEditInputChange = (e) => {
    setCurrentTask({ ...currentTask, task: e.target.value });
  };

  const handleDueDateInputChange = (e) => {
    setCurrentDueDate(e.target.value);
  };

  const handleAddTask = (newTask) => {
    const taskWithIsoDate = { ...newTask, dueDate: new Date(newTask.dueDate).toISOString() };
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskWithIsoDate)
    })
      .then(response => response.json())
      .then(newTask => {
        setTasks([...tasks, newTask]);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <>
      <AddBar onAddTask={(newTask) => handleAddTask(newTask)} />
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index} className="task-container">
            {isEditing && editingTask === task ? (
              <>
                <input
                  type="text"
                  value={currentTask.task}
                  onChange={handleEditInputChange}
                />
                <input
                  type="datetime-local"
                  value={currentDueDate}
                  onChange={handleDueDateInputChange}
                />
              </>
            ) : (
              <>
                <div className="text">{task.task}</div>
                <div className="due-date">{formatDueDate(task.dueDate)}</div>
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
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </>
  );
}

export default Task;