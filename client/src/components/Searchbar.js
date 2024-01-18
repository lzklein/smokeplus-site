import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SessionContext } from '../App';

const Searchbar = () => {
  const { addToCart, isMobile } = useContext(SessionContext);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if(!!searchText){
      navigate(`/search?query=${encodeURIComponent(searchText)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleScroll = () => {
    if (isMobile) {
      const searchContainer = document.querySelector('.search-container');
  
      if (searchContainer) {
        const scrollPosition = window.scrollY;
  
        if (scrollPosition >= 60) {
          searchContainer.classList.add('sticky');
        } else {
          searchContainer.classList.remove('sticky');
        }
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);

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
