import React, { useState } from 'react';
import { useSongs } from '../context/SongsContext';
import { useNavigate } from 'react-router-dom'; 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { handleSearch } = useSongs();
  const navigateSearch = useNavigate();

  const handleClick = () => {
    if (useNavigate) {
      navigateSearch('/home');
    } else {
      navigateSearch('/notFound');
    }
    }
  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Buscar canción, artista o grupo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" onClick={handleClick}>Buscar</button>
    </form>
  );
};

export default SearchBar;