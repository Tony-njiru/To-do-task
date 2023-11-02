import React from 'react';
import Todo from './components/Todo';
import { saveToLocalStorage, getFromLocalStorage } from './components/LocalStorage'; // Imports the functions

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
