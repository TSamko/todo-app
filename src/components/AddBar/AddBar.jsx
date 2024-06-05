/* eslint-disable */
import React, { useState } from 'react';
import './AddBar.css';

function AddBar({ onAddTask }) {
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '' && dueDate !== '') {
      onAddTask({ task: newTask, dueDate: new Date(dueDate).toISOString() });
      setNewTask('');
      setDueDate('');
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter new task"
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={handleDueDateChange}
        placeholder="Enter due date"
      />
      <button type="submit">Add to Todo List</button>
    </form>
  );
}

export default AddBar;