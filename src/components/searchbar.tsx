// searchbar.tsx

import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  handleSearch: (term: string) => void; // Define the handleSearch prop
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearch }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value); // Call the handleSearch function when input changes
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
