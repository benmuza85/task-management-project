// src/components/KanbanBoard.js
import React, { useState, useEffect } from 'react';

const KanbanBoard = ({ tasks, setTasks, selectedProject }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    assignees: [],
    priority: 'Medium',
    status: 'To Do',
  }); // State to hold new task details

  const filteredTasks = selectedProject
    ? tasks.filter((task) => task.project === selectedProject)
    : tasks;

  // Handle new task input change
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
      project: selectedProject || '', // Assign to selected project or empty string if none selected
    }));
  };

  // Add a new task to the Kanban board
  const handleAddTask = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
      setNewTask({
        title: '',
        dueDate: '',
        assignees: [],
        priority: 'Medium',
        status: 'To Do',
      }); // Reset task form
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDragStart = (e, taskId, currentStatus) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('currentStatus', currentStatus);
  };

  const handleDrop = async (e, newStatus) => {
    const taskId = e.dataTransfer.getData('taskId');
    const currentStatus = e.dataTransfer.getData('currentStatus');

    if (currentStatus !== newStatus) {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });

        const updatedTask = await response.json();

        // Update the task state after moving it to a new column
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <section className="p-4">
      <h2 className="text-lg text-blue-400 font-semibold mb-4">Kanban Board</h2>

      <div className="grid grid-cols-3 gap-4">
        {/* To Do Column */}
        <div
          className="p-4 bg-gray-100 rounded shadow"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'To Do')}
        >
          <h3 className="text-md font-semibold mb-2">To Do</h3>
          {filteredTasks
            .filter((task) => task.status === 'To Do')
            .map((task) => (
              <div
                key={task._id}
                className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task._id, 'To Do')}
              >
                <p>{task.title}</p>
                <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
                <p className="text-sm text-gray-600">
                  Assigned Users: {task.assignees.join(', ')}
                </p>
              </div>
            ))}
        </div>

        {/* In Progress Column */}
        <div
          className="p-4 bg-gray-100 rounded shadow"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'In Progress')}
        >
          <h3 className="text-md font-semibold mb-2">In Progress</h3>
          {filteredTasks
            .filter((task) => task.status === 'In Progress')
            .map((task) => (
              <div
                key={task._id}
                className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task._id, 'In Progress')}
              >
                <p>{task.title}</p>
                <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
                <p className="text-sm text-gray-600">
                  Assigned Users: {task.assignees.join(', ')}
                </p>
              </div>
            ))}
        </div>

        {/* Done Column */}
        <div
          className="p-4 bg-gray-100 rounded shadow"
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'Done')}
        >
          <h3 className="text-md font-semibold mb-2">Done</h3>
          {filteredTasks
            .filter((task) => task.status === 'Done')
            .map((task) => (
              <div
                key={task._id}
                className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task._id, 'Done')}
              >
                <p>{task.title}</p>
                <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
                <p className="text-sm text-gray-600">
                  Assigned Users: {task.assignees.join(', ')}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
