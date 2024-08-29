// src/components/ProjectView.js
import React, { useState, useEffect } from 'react';

const ProjectView = ({ tasks, selectedProject, onProjectSelect, setTasks, unFilteredTasks }) => {
  const [newProject, setNewProject] = useState(''); // State to hold new project name
  const [projects, setProjects] = useState([]); // State to hold available projects
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'To Do',
    assignees: [],
  }); // State to hold new task details

  useEffect(() => {
    // Dynamically extract unique projects from tasks
    const uniqueProjects = [
      ...new Set(tasks.map((task) => task.project)),
    ];
    setProjects(uniqueProjects);
  }, [unFilteredTasks]);

  // Handle project selection change
  const handleProjectChange = (e) => {
    onProjectSelect(e.target.value);
  };

  // Handle new project input change
  const handleNewProjectChange = (e) => {
    setNewProject(e.target.value);
  };

  // Add a new project to the dropdown and set it as the selected project
  const handleAddProject = () => {
    if (newProject && !projects.includes(newProject)) {
      setProjects(prev=>[...prev, newProject]);
      setNewProject('');
    }
  };

  // Handle new task input change
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
      project: selectedProject || newProject || '', // Assign to selected or new project
    }));
  };

  // Add a new task to the project
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
      setTasks([...unFilteredTasks, savedTask]);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        status: 'To Do',
        assignees: [],
      }); // Reset task form
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-lg text-blue-400 font-semibold mb-4">Project View</h2>

      {/* Project Selection Dropdown */}
      <div className="mb-4">
        <label htmlFor="projectSelect" className="block text-sm font-medium text-gray-700">
          Select Project
        </label>
        <select
          id="projectSelect"
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <option value="">All Projects</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Project */}
      <div className="mb-4">
        <label htmlFor="newProject" className="block text-sm font-medium text-gray-700">
          Add New Project
        </label>
        <div className="flex">
          <input
            id="newProject"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
            value={newProject}
            onChange={handleNewProjectChange}
            placeholder="Enter new project name"
          />
          <button
            onClick={handleAddProject}
            className="ml-2 px-4 py-2 bg-blue-700 text-white rounded-md shadow-sm hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Task Table */}
      {tasks.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead className="bg-green-200">
            <tr>
              <th className="p-2">Task Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Status</th>
              <th className="p-2">Assigned Users</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.description}</td>
                <td className="p-2">{task.dueDate}</td>
                <td className="p-2">{task.priority}</td>
                <td className="p-2">{task.status}</td>
                <td className="p-2">{task.assignees.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No tasks available for this project.</p>
      )}

      {/* Add New Task */}
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Add New Task(Make sure before adding task you have selected what project to add to)</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTask.title}
              onChange={handleTaskInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={newTask.description}
              onChange={handleTaskInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleTaskInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={newTask.priority}
              onChange={handleTaskInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newTask.status}
              onChange={handleTaskInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <label htmlFor="assignees" className="block text-sm font-medium text-gray-700">
              Assignees
            </label>
            <input
              type="text"
              id="assignees"
              name="assignees"
              value={newTask.assignees.join(', ')}
              onChange={(e) =>
                setNewTask({ ...newTask, assignees: e.target.value.split(', ') })
              }
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
              placeholder="Enter assignees separated by commas"
            />
          </div>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-blue-600"
          onClick={handleAddTask}
          disabled={!selectedProject && !newProject} // Disable if no project is selected or created
        >
          Add Task
        </button>
      </div>
    </section>
  );
};

export default ProjectView;
