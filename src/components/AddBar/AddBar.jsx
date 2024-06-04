/* eslint-disable */
import React, { useState } from 'react';
import './AddBar.css';

function AddBar({ onAddTask }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim()!== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter new task"
      />
      <button type="submit">Add to Todo List</button>
    </form>
  );
}

export default AddBar;