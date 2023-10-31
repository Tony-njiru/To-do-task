import React, { useState } from 'react';

interface TodoFormProps {
  onTodoAdd: (newTodo: TodoItem) => void;
}

interface TodoItem {
  title: string;
  description: string;
  isDone: boolean;
  isEditing: boolean;
  category: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoAdd }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoCategory, setTodoCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const handleAddTodo = () => {
    let category = todoCategory;

    if (todoCategory === 'Custom' && customCategory.trim() !== '') {
      category = customCategory.trim();
    }

    const newTodo: TodoItem = {
      title: todoTitle,
      description: todoDescription,
      isDone: false,
      isEditing: false,
      category: category,
    };
    onTodoAdd(newTodo);
    // Reset form fields
    setTodoTitle('');
    setTodoDescription('');
    setTodoCategory('');
    setCustomCategory('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Todo Title"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <textarea
        placeholder="Todo Description"
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <select
        value={todoCategory}
        onChange={(e) => setTodoCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Custom">Custom</option>
      </select>
      {todoCategory === 'Custom' && (
        <input
          type="text"
          placeholder="Custom Category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />
      )}
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
