// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import TaskDashboard from './components/TaskDashboard';
import ProjectView from './components/ProjectView';
import KanbanBoard from './components/KanbanBoard';
import Login from './components/Login';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, []);

  useEffect(() => {
    // Filter tasks based on search term
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchTerm, tasks]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data); // Set filtered tasks to initial tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch('/auth/user');
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Protect the main route */}
        <Route
          path="/"
          element={user ? (
            <div className="App">
              <Header user={user} setUser={setUser} onSearch={setSearchTerm} />
              <div className="container mx-auto p-4">
                <TaskDashboard tasks={filteredTasks} setTasks={setTasks} />
                <ProjectView tasks={filteredTasks} unFilteredTasks={tasks} selectedProject={selectedProject} onProjectSelect={setSelectedProject} setTasks={setTasks} />
                <KanbanBoard tasks={filteredTasks} setTasks={setTasks} selectedProject={selectedProject} />
              </div>
            </div>
          ) : (
            <Login/>
          )}
        />
      </Routes>
    </Router>
  );
};

export default App;
