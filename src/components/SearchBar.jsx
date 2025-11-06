import React, { useState } from 'react';
import { useSongs } from '../context/SongsContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

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
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input 
        className="rounded-2xl bg-purple-900/30 w-[500px] h-[35px] text-center mr-4
                   hover:bg-purple-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500
                   lg:w-[500px] md:w-[250px] max-sm:w-[200px]
                   text-white placeholder-gray-400"
        type="text"
        placeholder="Buscar canción, artista o grupo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button 
        type="submit" 
        className="w-10 h-10 flex items-center justify-center bg-[#691175] rounded-full
                   hover:shadow-[0_0_10px_#ffffff] transition-shadow"
      >
        <FontAwesomeIcon icon={faMusic} size='xl' />
      </button>
    </form>
  );
};

export default SearchBar;