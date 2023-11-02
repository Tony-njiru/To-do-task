import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo';

// Mock the LocalStorage module to avoid actual storage operations
jest.mock('./LocalStorage', () => ({
  get: jest.fn().mockReturnValue([]), // Mock the get function to return an empty array
  set: jest.fn(), // Mock the set function
  remove: jest.fn(), // Mock the remove function
}));

test('renders the todo app with initial UI elements', () => {
  render(<Todo />);
  const todoApp = screen.getByText('To Do');
  expect(todoApp).toBeInTheDocument();

  const addTaskButton = screen.getByText('Add Task');
  expect(addTaskButton).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText('Search...');
  expect(searchInput).toBeInTheDocument();

  const labelList = screen.getByRole('list', { name: 'Label List' });
  expect(labelList).toBeInTheDocument();
});

test('adds a task to the list', () => {
  render(<Todo />);
  const addTaskButton = screen.getByText('Add Task');
  fireEvent.click(addTaskButton);

  const taskTitleInput = screen.getByPlaceholderText('Task Title');
  const taskDescriptionInput = screen.getByPlaceholderText('Task Description');

  fireEvent.change(taskTitleInput, { target: { value: 'Test Task' } });
  fireEvent.change(taskDescriptionInput, { target: { value: 'Test Description' } });

  const addTaskButtonInForm = screen.getByText('Add Task');
  fireEvent.click(addTaskButtonInForm);

  // Now you can assert that the new task is displayed in the list
  const taskTitle = screen.getByText('Test Task');
  const taskCategory = screen.getByText('school');

  expect(taskTitle).toBeInTheDocument();
  expect(taskCategory).toBeInTheDocument();
});

test('deletes a task from the list', () => {
  render(<Todo />);
  const addTaskButton = screen.getByText('Add Task');
  fireEvent.click(addTaskButton);

  const taskTitleInput = screen.getByPlaceholderText('Task Title');
  const taskDescriptionInput = screen.getByPlaceholderText('Task Description');

  fireEvent.change(taskTitleInput, { target: { value: 'Test Task' } });
  fireEvent.change(taskDescriptionInput, { target: { value: 'Test Description' } });

  const addTaskButtonInForm = screen.getByText('Add Task');
  fireEvent.click(addTaskButtonInForm);

  // Now you can assert that the new task is displayed in the list
  const taskTitle = screen.getByText('Test Task');
  const taskCategory = screen.getByText('school');
  const deleteButton = screen.getByText('Delete');

  expect(taskTitle).toBeInTheDocument();
  expect(taskCategory).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();

  fireEvent.click(deleteButton);

  // Verify that the task is removed from the list
  const deletedTaskTitle = screen.queryByText('Test Task');
  const deletedTaskCategory = screen.queryByText('school');
  expect(deletedTaskTitle).toBeNull();
  expect(deletedTaskCategory).toBeNull();
});

test('copies task description to clipboard', () => {
  render(<Todo />);
  const addTaskButton = screen.getByText('Add Task');
  fireEvent.click(addTaskButton);

  const taskTitleInput = screen.getByPlaceholderText('Task Title');
  const taskDescriptionInput = screen.getByPlaceholderText('Task Description');

  fireEvent.change(taskTitleInput, { target: { value: 'Test Task' } });
  fireEvent.change(taskDescriptionInput, { target: { value: 'Test Description' } });

  const addTaskButtonInForm = screen.getByText('Add Task');
  fireEvent.click(addTaskButtonInForm);

  const copyButton = screen.getByText('Copy');
  fireEvent.click(copyButton);

  // You may need to mock the clipboard functionality for this test
  // Ensure that the clipboard function is called as expected
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Test Description');
});

test('marks a task as done', () => {
  render(<Todo />);
  const addTaskButton = screen.getByText('Add Task');
  fireEvent.click(addTaskButton);

  const taskTitleInput = screen.getByPlaceholderText('Task Title');
  const taskDescriptionInput = screen.getByPlaceholderText('Task Description');

  fireEvent.change(taskTitleInput, { target: { value: 'Test Task' } });
  fireEvent.change(taskDescriptionInput, { target: { value: 'Test Description' } });

  const addTaskButtonInForm = screen.getByText('Add Task');
  fireEvent.click(addTaskButtonInForm);

  const doneButton = screen.getByText('Done');
  fireEvent.click(doneButton);

  // Verify that the task is marked as done
  const doneCategory = screen.getByText('Done');
  expect(doneCategory).toBeInTheDocument();
});

test('displays label details in the right section when a label is clicked', () => {
  render(<Todo />);
  const addTaskButton = screen.getByText('Add Task');
  fireEvent.click(addTaskButton);

  const taskTitleInput = screen.getByPlaceholderText('Task Title');
  const taskDescriptionInput = screen.getByPlaceholderText('Task Description');

  fireEvent.change(taskTitleInput, { target: { value: 'Test Task' } });
  fireEvent.change(taskDescriptionInput, { target: { value: 'Test Description' } });

  const addTaskButtonInForm = screen.getByText('Add Task');
  fireEvent.click(addTaskButtonInForm);

  const labelTitle = screen.getByText('Test Task');
  fireEvent.click(labelTitle);

  // Verify that the details of the clicked label are displayed in the right section
  const rightSectionTitle = screen.getByText('Test Task');
  const rightSectionDescription = screen.getByText('Test Description');
  expect(rightSectionTitle).toBeInTheDocument();
  expect(rightSectionDescription).toBeInTheDocument();
});
