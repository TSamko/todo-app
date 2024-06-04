/* eslint-disable */
import { useState, useEffect } from 'react';
import './Task.css';
import Cookies from 'js-cookie';
import AddBar from '../AddBar/AddBar.jsx';

const tasksJson = [
  {
    id: 1,
    task: "Learn about JSON",
    dueDate: "2024-06-04",
    author: "AqilCont"
  },
  {
    id: 2,
    task: "Create a quote machine",
    dueDate: "2024-06-04",
    author: "alta9"
  },
  {
    id: 3,
    task: "Understand the difference between JSON and XML",
    dueDate: "2024-06-04",
    author: "hejmaria"
  }
];

function Task() {
  const [tasks, setTasks] = useState(Cookies.get('tasks')? JSON.parse(Cookies.get('tasks')) : tasksJson);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    Cookies.set('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleEdit = (task) => {
    if (editingTask!== task) {
      setEditingTask(task);
      setIsEditing(true);
      setCurrentTask(task);
    }
  };

  const handleSave = (task) => {
    const updatedTasks = tasks.map((t) => (t.id === task.id? {...t, task: currentTask.task } : t));
    setTasks(updatedTasks);
    setEditingTask(null);
    setIsEditing(false);
  };

  const handleRemove = (task) => {
    const updatedTasks = tasks.filter((t) => t.id!== task.id);
    setTasks(updatedTasks);
  };

  const handleEditInputChange = (e) => {
    setCurrentTask({...currentTask, task: e.target.value });
  };

  const handleAddTask = (newTask) => {
    const newTaskObj = { id: tasks.length + 1, task: newTask, dueDate: "", author: "" };
    setTasks([...tasks, newTaskObj]);
  };

  return (
    <>
      <AddBar onAddTask={handleAddTask} />
      {tasks.map((task, index) => (
        <div key={index} className="task-container">
          {isEditing && editingTask === task? (
            <input
              type="text"
              value={currentTask.task}
              onChange={handleEditInputChange}
            />
          ) : (
            <div className="text">{task.task}</div>
          )}
          <div className="btns">
            {isEditing && editingTask === task? (
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