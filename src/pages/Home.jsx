import React from 'react';
import { useSongs } from '../context/SongsContext';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard'; 

const Home = () => {
  const { songs, isLoading, error } = useSongs();

  return (
    <div className="home-page">
      <h1>Catálogo de Música</h1>
      
      <SearchBar /> 

      {isLoading && <p>Cargando canciones...</p>}
      {error && <p className="error">{error}</p>}
      
      <div className="song-gallery">
        {songs.length > 0 ? (
          songs.map((song) => (
            <SongCard key={song.codigo_unico} song={song} />
          ))
        ) : (
          !isLoading && <p>Busca tus canciones favoritas en Deezer.</p>
        )}
      </div>
    </div>
  );
};

export default Home;