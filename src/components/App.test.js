import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Helper function to add a new todo
const addTodo = (title) => {
  const inputElement = screen.getByPlaceholderText('Todo Title');
  fireEvent.change(inputElement, { target: { value: title } });
  const addButton = screen.getByText('Add');
  fireEvent.click(addButton);
};

// Helper function to get a todo element by its title
const getTodoElement = (title) => {
  return screen.getByText(new RegExp(title, 'i'));
};

test('renders the App component with initial UI elements', () => {
  render(<App />);

  // Check for elements like headings, input fields, and buttons
  const titleElement = screen.getByText('My Todo App');
  const inputElement = screen.getByPlaceholderText('Todo Title');
  const addButton = screen.getByText('Add');

  expect(titleElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test('adds a new todo when the "Add" button is clicked', () => {
  render(<App />);

  // Add a new todo
  addTodo('New Todo');

  // Check if the new todo is displayed
  const addedTodo = getTodoElement('New Todo');
  expect(addedTodo).toBeInTheDocument();
});

test('marks a todo as completed when the "Done" button is clicked', () => {
  render(<App />);

  // Add a new todo
  addTodo('New Todo');

  // Mark the todo as completed
  const doneButton = screen.getByText('Done');
  fireEvent.click(doneButton);

  // Check if the todo is marked as completed
  const completedTodo = getTodoElement('New Todo (Done)');
  expect(completedTodo).toBeInTheDocument();
});

test('deletes a todo when the "Delete" button is clicked', () => {
  render(<App />);

  // Add a new todo
  addTodo('New Todo');

  // Delete the todo
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  // Check if the todo is deleted
  const deletedTodo = screen.queryByText('New Todo (Done)');
  expect(deletedTodo).not.toBeInTheDocument();
});
