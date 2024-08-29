// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

  const [error, setError] = useState('');

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl text-center text-blue-500 font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="mt-4">
          <Link
            to="http://localhost:5000/auth/google"
            className="w-full block text-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Login with Google
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
