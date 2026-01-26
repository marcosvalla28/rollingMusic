import React, { useState, useEffect } from 'react';
import { useSongs } from '../context/SongsContext';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { handleSearch, clearSearch, searchTerm } = useSongs();
  const navigateSearch = useNavigate();

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const processSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSearch(inputValue); // Ejecuta la búsqueda en el contexto
      navigateSearch('/search');      // Te lleva a la página de resultados
    }
  };

  const handleClearAction = () => {
    setInputValue('');
    clearSearch();
    navigate('/'); // Al limpiar, volvemos al Home automáticamente
  };

  return (
    <form onSubmit={processSearch} className="flex items-center gap-2">
      <div className="relative flex items-center">
        <input 
          className="rounded-2xl bg-purple-900/30 w-[200px] md:w-[300px] lg:w-[500px] h-[35px] px-4 pr-10
                     hover:bg-purple-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500
                     text-white placeholder-gray-400 transition-all"
          type="text"
          placeholder="Buscar canción, artista o grupo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
        {/* BOTÓN DE LIMPIAR (X) */}
        {inputValue && (
          <button 
            type="button"
            onClick={handleClearAction}
            className="absolute right-3 text-gray-400 hover:text-white transition-colors"
            title="Limpiar búsqueda"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>

      <button 
        type="submit"
        className="hidden md:block bg-purple-700 hover:bg-purple-600 text-white px-4 py-1 rounded-xl text-sm font-medium transition-colors"
      >
        Buscar
      </button>

      <button 
        type="submit" 
        className="w-10 h-10 flex items-center justify-center bg-[#691175] rounded-full
                   hover:shadow-[0_0_10px_#ffffff] transition-shadow ml-1"
      >
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </form>
  );
};

export default SearchBar;