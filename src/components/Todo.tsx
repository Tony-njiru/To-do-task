//main code
import React, { useState, useEffect } from 'react';
import './Todo.css';
import SearchBar from './searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faTrash, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { LocalStorage } from './LocalStorage'; // Import the LocalStorage module

interface TodoItem {
  title: string;
  description: string;
  isDone: boolean;
  category: string;
}

interface AddedLabel {
  title: string;
  description: string;
  category: string;
  fullInfo: {
    title: string;
    description: string;
    category: string;
  };
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoDescription, setTodoDescription] = useState<string>('');
  const [showLabelInput, setShowLabelInput] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [labelTitle, setLabelTitle] = useState<string>('');
  const [labelDescription, setLabelDescription] = useState<string>('');
  const [labelCategory, setLabelCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [addedLabels, setAddedLabels] = useState<AddedLabel[]>([]);

  useEffect(() => {
    const storedTodos = LocalStorage.get('todos', []); // Retrieve todos from local storage
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    LocalStorage.set('todos', todos); // Store todos in local storage
  }, [todos]);

  const addLabel = () => {
    if (labelTitle && labelCategory) {
      const newLabel: AddedLabel = {
        title: labelTitle,
        description: labelDescription,
        category: labelCategory,
        fullInfo: {
          title: labelTitle,
          description: labelDescription,
          category: labelCategory,
        },
      };
      setAddedLabels([...addedLabels, newLabel]);
      setLabelTitle('');
      setLabelDescription('');
      setLabelCategory('');
      setShowLabelInput(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Text copied to clipboard'))
      .catch((error) => console.error('Copy to clipboard failed:', error));
  };

  const markAsDone = (index: number) => {
    const updatedLabels = [...addedLabels];
    updatedLabels[index].category = "Done";
    setAddedLabels(updatedLabels);
  };

  const deleteLabel = (index: number) => {
    const updatedLabels = addedLabels.filter((_, i) => i !== index);
    setAddedLabels(updatedLabels);
    setPreviewIndex(null); // Reset the preview index
  };

  const editTodo = (index: number, newTitle: string, newDescription: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index].title = newTitle;
    updatedTodos[index].description = newDescription;
    setTodos(updatedTodos);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const selectLabel = (index: number) => {
    setPreviewIndex(index);
  };

  const filteredLabels = addedLabels.filter((label) =>
    label.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-app">
      <div className="left-section">
        <h2 className="section-title">
          To Do
        </h2>
      </div>
      <div className="center-section">
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <button
          onClick={() => setShowLabelInput(!showLabelInput)}
          className={`add-label-button ${showLabelInput ? 'cancel' : ''}`}
        >
          {showLabelInput ? 'Cancel' : 'Add Task'}
        </button>
        {showLabelInput && (
          <div className="label-input">
            <input
              placeholder="Task Title"
              value={labelTitle}
              onChange={(e) => setLabelTitle(e.target.value)}
            />
            <textarea
              placeholder="Task Description"
              value={labelDescription}
              onChange={(e) => setLabelDescription(e.target.value)}
            />
            <select
              placeholder="Label Category"
              value={labelCategory}
              onChange={(e) => setLabelCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {['school', 'personal', 'work out'].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
            {labelCategory === 'custom' && (
              <input
                placeholder="Custom Category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
            <button onClick={addLabel}>Add Task</button>
          </div>
        )}
        <ul className="label-list">
          {filteredLabels.map((label, index) => (
            <li key={index} onClick={() => selectLabel(index)}>
              <span className="label-title">{label.title}</span>
              <span className="label-category">{label.category}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-section">
        {previewIndex !== null && addedLabels[previewIndex] && (
          <div>
            <h3>{addedLabels[previewIndex].fullInfo.title}</h3>
            <p>{addedLabels[previewIndex].fullInfo.description}</p>
            <div className="icon-buttons">
              <button
                onClick={() => copyToClipboard(addedLabels[previewIndex].fullInfo.description)}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faClipboard} /> Copy
              </button>
              <button
                onClick={() => markAsDone(previewIndex)}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faCheck} /> Done
              </button>
              <button
                onClick={() => deleteLabel(previewIndex)}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
