// src/__tests__/Header.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import Jest DOM matchers
import Header from '../components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header Component', () => {
  test('renders the header correctly with user', () => {
    const user = { name: 'John Doe' };
    render(
            <Router>
                <Header user={user} />
            </Router>
          );

    expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
  });

  test('calls the onSearch function when the user types in the search input', () => {
    const mockOnSearch = jest.fn();
    render(
      <Router>
        <Header user={{ name: 'John Doe' }} onSearch={mockOnSearch} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search tasks/i), {
      target: { value: 'Task 1' },
    });
    expect(mockOnSearch).toHaveBeenCalledWith('Task 1');
  });
});
