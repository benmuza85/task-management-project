// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({fetchTasks, setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'  },
        credentials:'include',
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        if(data.user){
          setUser(data.user);
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred during login.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        if(data.user){
          setUser(data.user);
        }
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Error signing up:', err);
      setError('An error occurred during signup.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome to Task Management System
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please log in to continue or sign up to create an account.
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!isSignup ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">Don't have an account?</p>
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Sign Up
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">Already have an account?</p>
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setIsSignup(false)}
              >
                Log In
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <a
            href={process.env.NODE_ENV==='production'?"https://task-management-benson-cda7d51e8621.herokuapp.com/auth/google":'http://localhost:5000/auth/google'}
            className="w-full block text-center bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Login with Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
