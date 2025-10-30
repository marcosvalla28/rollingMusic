import React, { useState } from 'react';
import { useSongs } from '../context/SongsContext'; 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { handleSearch } = useSongs();

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
      <button type="submit">Buscar</button>
    </form>
  );
};

export default SearchBar;