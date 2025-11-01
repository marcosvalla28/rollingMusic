import React, { createContext, useContext, useState } from 'react';
import { searchSongs } from '../services/musicApi';

const SongsContext = createContext();

export const useSongs = () => useContext(SongsContext);

export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentSong, setCurrentSong] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setSongs([]); 

    try {
      const results = await searchSongs(query);
      setSongs(results);
    } catch (err) {
      setError("Error al cargar canciones. Intenta de nuevo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectSong = (song) => setCurrentSong(song);

  const value = {
    songs,
    isLoading,
    error,
    handleSearch,
    currentSong,
    selectSong,

  };

  return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>;
};