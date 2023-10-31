import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo) {
      setTodos([...todos, { title: newTodo, completed: false }]);
      setNewTodo(''); // Reset the input field
    }
  };

  const markAsDone = (title) => {
    const updatedTodos = todos.map((todo) =>
      todo.title === title ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (title) => {
    const updatedTodos = todos.filter((todo) => todo.title !== title);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>My Todo App</h1>
      <input
        type="text"
        placeholder="Todo Title"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.title}>
            {todo.title}
            {todo.completed ? (
              <span> (Done)</span>
            ) : (
              <button onClick={() => markAsDone(todo.title)}>Done</button>
            )}
            <button onClick={() => deleteTodo(todo.title)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
