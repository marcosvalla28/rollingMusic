import React, { useState, useEffect } from "react";
import { useSongs } from "../context/SongsContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const { handleSearch, clearSearch, searchTerm } = useSongs();
  const navigateSearch = useNavigate();

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const processSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSearch(inputValue); // Ejecuta la búsqueda en el contexto
      navigateSearch("/search"); // Te lleva a la página de resultados
    }
  };

  const handleClearAction = () => {
    setInputValue("");
    clearSearch();
    navigateSearch("/"); // Al limpiar, volvemos al Home automáticamente
  };

  return (
    <form
      onSubmit={processSearch}
      className="flex items-center gap-1 sm:gap-2 w-full max-w-xs sm:max-w-sm md:max-w-lg"
      role="search"
    >
      <div className="relative flex items-center w-full">
        <input
          type="text"
          placeholder="Buscar canción, artista..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded-2xl bg-purple-900/30 w-full h-9 px-4 pr-10
                     hover:bg-purple-700/30 focus:outline-none focus:ring-2 focus:ring-purple-500
                     text-white placeholder-gray-400 text-sm transition-all"
        />
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

      {/* Botón texto — solo md */}
      <button
        type="submit"
        className="hidden md:block shrink-0 bg-[#691175] px-4 h-9 rounded-xl text-white"
      >
        Buscar
      </button>

      {/* Botón ícono — siempre visible */}
      <button
        type="submit"
        className="md:hidden shrink-0 w-9 h-9 flex items-center justify-center bg-[#691175] rounded-full"
      >
        <FontAwesomeIcon icon={faMusic} className="text-sm" />
      </button>
    </form>
  );
};
export default SearchBar;
