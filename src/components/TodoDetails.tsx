import React from 'react';

interface TodoDetailsProps {
  todo: TodoItem | null;
}

interface TodoItem {
  title: string;
  description: string;
  isDone: boolean;
  isEditing: boolean;
  category: string;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ todo }) => {
  return (
    <div className="todo-details">
      {todo ? (
        <>
          <h2>Todo Details</h2>
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>Description:</strong> {todo.description}
          </p>
          <p>
            <strong>Category:</strong> {todo.category}
          </p>
        </>
      ) : (
        <p>Select a todo to view details.</p>
      )}
    </div>
  );
};

export default TodoDetails;
