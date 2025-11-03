import React from 'react';
import { useSongs } from '../context/SongsContext';
import SongCard from '../components/SongCard'; 
import Footer from '../components/Footer';

const Home = () => {
  const { songs, isLoading} = useSongs();

  return (
    <>
    <div className="home-page w-full h-full flex flex-col items-center">
  <h1 className="text-2xl font-bold mb-8">Catálogo de Música</h1>
      
       <div className="song-gallery grid grid-cols-3 gap-4 w-full">
        {songs.length > 0 ? (
          songs.map((song) => (
            <SongCard key={song.codigo_unico} song={song} />
          ))
        ) : (
          !isLoading && <p>Busca tus canciones favoritas en Deezer.</p>
        )}
      </div>
    </div>  
      <Footer />
      </>
    
  );
};

export default Home;