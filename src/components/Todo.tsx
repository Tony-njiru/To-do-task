import React, { useState, useEffect } from 'react';
import './Todo.css';
import './SearchBar.css';
import SearchBar from './searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faCheck,
  faTrash,
  faClipboard,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons';

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
  isPinned: boolean;
}

const LOCAL_STORAGE_KEY = 'todoApp';

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
  const [isLabelPreviewed, setIsLabelPreviewed] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const selectLabel = (index: number) => {
    if (index === previewIndex) {
      setPreviewIndex(null);
      setIsLabelPreviewed(false);
    } else {
      setPreviewIndex(index);
      setIsLabelPreviewed(true);
    }
  };

  const addLabel = () => {
    if (labelTitle) {
      let category = labelCategory;

      if (labelCategory === 'custom' && customCategory.trim() !== '') {
        category = customCategory.trim();
      }

      const newLabel: AddedLabel = {
        title: labelTitle,
        description: labelDescription,
        category: category,
        fullInfo: {
          title: labelTitle,
          description: labelDescription,
          category: category,
        },
        isPinned: false,
      };

      // Update the addedLabels state
      setAddedLabels([newLabel, ...addedLabels]);

      // Save addedLabels to local storage
      const updatedLabels = [newLabel, ...addedLabels];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLabels));

      setLabelTitle('');
      setLabelDescription('');
      setLabelCategory('');
      setCustomCategory('');
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
    updatedLabels[index].category = "Congratulations! you finished the task";
    setAddedLabels(updatedLabels);

    // Save updatedLabels to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLabels));
  };

  const deleteLabel = (index: number) => {
    const updatedLabels = addedLabels.filter((_, i) => i !== index);

    // Update the addedLabels state
    setAddedLabels(updatedLabels);

    // Save updatedLabels to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLabels));

    setPreviewIndex(null);
  };

  const togglePin = (index: number) => {
    const updatedLabels = [...addedLabels];
    updatedLabels[index].isPinned = !updatedLabels[index].isPinned;

    // Update the addedLabels state
    setAddedLabels(updatedLabels);

    // Save updatedLabels to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLabels));

    if (updatedLabels[index].isPinned) {
      showNotification(`Task "${updatedLabels[index].title}" is pinned!`);
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Filter labels based on the search term
  const filteredLabels = addedLabels.filter((label) =>
    label.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Split the labels into pinned and unpinned tasks
  const pinnedLabels = filteredLabels.filter((label) => label.isPinned);
  const unpinnedLabels = filteredLabels.filter((label) => !label.isPinned);

  useEffect(() => {
    // Load labels from local storage when the component mounts
    const storedLabels = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLabels) {
      setAddedLabels(JSON.parse(storedLabels));
    }
  }, []);

  return (
    <div className="todo-app">
      <div className="left-section">
        <h2 className="section-title">
          Tasks To DO
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
              {['School', 'Personal', 'Work out'].map((category) => (
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
          {unpinnedLabels.map((label, index) => (
            <li
              key={index}
              onClick={() => selectLabel(addedLabels.indexOf(label))}
              className={isLabelPreviewed && addedLabels.indexOf(label) === previewIndex ? 'selected-label' : ''}
            >
              <span className="label-title">{label.title}</span>
              <span className="label-category">{label.category}</span>
              <span
                className={`pin-icon ${label.isPinned ? 'pinned' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(addedLabels.indexOf(label));
                }}
              >
                <FontAwesomeIcon icon={faThumbtack} className="fa-icon" />
              </span>
            </li>
          ))}
          {pinnedLabels.map((label, index) => (
            <li
              key={index}
              onClick={() => selectLabel(addedLabels.indexOf(label))}
              className={isLabelPreviewed && addedLabels.indexOf(label) === previewIndex ? 'selected-label' : ''}
            >
              <span className="label-title">{label.title}</span>
              <span className="label-category">{label.category}</span>
              <span
                className={`pin-icon ${label.isPinned ? 'pinned' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(addedLabels.indexOf(label));
                }}
              >
                <FontAwesomeIcon icon={faThumbtack} className="fa-icon" />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-section">
        <h2 className="section-title">
          <u>Details</u>
        </h2>
        {previewIndex !== null && addedLabels[previewIndex] && (
          <div>
            <h3>{addedLabels[previewIndex].fullInfo.title}</h3>
            <p>{addedLabels[previewIndex].fullInfo.description}</p>
            <div className="icon-buttons">
              <button
                onClick={() => copyToClipboard(addedLabels[previewIndex].fullInfo.description)}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faClipboard} className="fa-icon" />
              </button>
              <button
                onClick={() => markAsDone(previewIndex)}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faCheck} className="fa-icon" />
              </button>
              <button
                onClick={() => deleteLabel(previewIndex)}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faTrash} className="fa-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="notification">
        {notification && <div className="notification-message">{notification}</div>}
      </div>
    </div>
  );
};

export default Todo;
//main todo app
