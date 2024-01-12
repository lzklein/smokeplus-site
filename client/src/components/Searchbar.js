import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Searchbar = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to /search with searchText as a query parameter
    navigate(`/search?query=${encodeURIComponent(searchText)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
        placeholder='Search'
      />
      <button onClick={handleSearch} className="search-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Searchbar;
