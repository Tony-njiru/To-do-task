import React from 'react';

interface TodoListProps {
  todos: TodoItem[];
  onTodoClick: (todo: TodoItem) => void;
}

interface TodoItem {
  title: string;
  description: string;
  isDone: boolean;
  isEditing: boolean;
  category: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onTodoClick }) => {
  return (
    <div className="todo-list">
      <h2>Todos</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} onClick={() => onTodoClick(todo)}>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;


