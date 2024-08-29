// src/components/TaskDashboard.js
import React, { useState } from 'react';

const TaskDashboard = ({ tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Open the edit form for a specific task
  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  // Handle input change for editing a task
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Save the edited task and update the backend
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/tasks/${currentTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentTask),
      });

      const updatedTask = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );

      setIsEditing(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task and update the backend
  const handleDelete = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl text-blue-500 font-bold mb-4">Task Dashboard</h2>
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300">Task Title</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Description</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Due Date</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Priority</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Status</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Assignees</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="px-6 py-4 border-b">{task.title}</td>
              <td className="px-6 py-4 border-b">{task.description}</td>
              <td className="px-6 py-4 border-b">{task.dueDate}</td>
              <td className="px-6 py-4 border-b">{task.priority}</td>
              <td className="px-6 py-4 border-b">{task.status}</td>
              <td className="px-6 py-4 border-b">
                {task.assignees.join(', ')}
              </td>
              <td className="px-6 py-4 border-b">
                <button
                  className="text-green-600 hover:underline mr-4"
                  onClick={() => handleEditClick(task)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Task Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={currentTask.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={currentTask.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  name="priority"
                  value={currentTask.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={currentTask.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;
