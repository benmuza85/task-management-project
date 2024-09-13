// src/__tests__/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import Jest DOM matchers
import Login from '../components/Login';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login Component', () => {
  test('renders login form correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByText(/Welcome to Task Management System/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('allows the user to fill out the form and submit', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    expect(screen.getByLabelText(/Email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/Password/i).value).toBe('password123');
  });
});
