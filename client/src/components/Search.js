import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SessionContext } from '../App'; 
import ProductCard from './ProductCard';

const Search = () => {
  const { API_BASE_URL } = useContext(SessionContext);
  const [searchResults, setSearchResults] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // Fetch search results when the component mounts or when the search query changes
    const fetchSearchResults = async () => {
      try {
        if (query) {
          const response = await fetch(`${API_BASE_URL}/api/products/search/${encodeURIComponent(query)}`);
          const data = await response.json();
          console.log(data)
          setSearchResults(data);
          setLoaded(true)
        } else {
          // Handle case when there is no search query
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [query]);

  const renderResults = () => {
    return searchResults.map(({ item }) => (
      <div key={item.id} className="productcard">
        <ProductCard product={item} />
      </div>
    ));
  };
  
  
  if(!loaded){
    return(
      <div style={{marginTop:'100px', marginBottom:'300px'}}>
        Searching . . . 
      </div>
    )
  }

  return (
    <div>
      <h2 style={{marginTop:'30px', marginBottom:'50px'}}>Search Results for "{query}"</h2>
      <div style={{marginBottom:'30px'}}className="productcard-container">{renderResults()}</div>
    </div>
  );
};

export default Search;
