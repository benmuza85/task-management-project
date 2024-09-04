// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, setUser, onSearch }) => {

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'GET',
      });
      if (response.ok) {
        setUser(null);
      }
    } catch (err) {
      alert('Error logging out')
      console.error('Error logging out:', err);
    }
  };

  return (
    <header className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Title */}
        <h1 className="text-2xl font-bold">Task Management System</h1>

        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search tasks..."
            className="px-4 py-2 rounded-md text-gray-800"
            onChange={(e) => onSearch(e.target.value)}
          />

          {user && (
            <>
              <span>Welcome, {user.name ||  user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
