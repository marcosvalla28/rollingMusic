import React, { useState } from 'react';
import { useSongs } from '../context/SongsContext'; 
import { GiMusicSpell } from "react-icons/gi";

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
      <input className='searchbox'
        type="text"
        placeholder="Buscar canción, artista o grupo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <button type="submit" className='nota'>
        <GiMusicSpell size={35} color='rgba(214, 4, 247, 0.61)'/>
      </button>
      </div>

    </form>
  );
};

export default SearchBar;