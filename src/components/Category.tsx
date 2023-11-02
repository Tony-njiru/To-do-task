//Used this for the first  apperance of selecting category
import React, { useState } from 'react';
import './Category.css';

interface CategoryProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const Category: React.FC<CategoryProps> = ({ onSelectCategory, selectedCategory }) => {
  const [customCategory, setCustomCategory] = useState('');
  const [isEditingCustomCategory, setIsEditingCustomCategory] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'custom') {
      setIsEditingCustomCategory(true);
    } else {
      setIsEditingCustomCategory(false);
      onSelectCategory(selectedValue);
    }
  };

  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(e.target.value);
    onSelectCategory(e.target.value); // Automatically set the category as it is typed
  };

  return (
    <div className="category-selector">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a Category</option>
        <option value="work">Work</option>
        <option value="travel">Travel</option>
        <option value="school">School</option>
        <option value="work-out">Work Out</option>
        <option value="custom">Custom</option>
      </select>

      {isEditingCustomCategory && (
        <input
          type="text"
          placeholder="Custom Category"
          value={customCategory}
          onChange={handleCustomCategoryChange}
        />
      )}
    </div>
  );
};

export default Category;
