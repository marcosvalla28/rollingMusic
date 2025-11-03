import React from 'react';
import { useSongs } from '../context/SongsContext';


function SongCard({ song }) { 
    const { selectSong } = useSongs();

    const handlePlay = () => {
      selectSong(song);


    }
    
    const { 
        titulo, 
        artista, 
        url_imagen, 
        codigo_unico 
    } = song; 

    if (!titulo) {

        return <div>Error al cargar datos de canción.</div>;
    }


    return (

        <div id={`song-${codigo_unico}`} className="song-card group relative h-full bg-linear-to-br from-pink-500/15 via-purple-600/15 to-cyan-400/15 backdrop-blur-sm border-2 border-cyan-300/40 rounded-2xl p-6 hover:border-pink-500/80 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/40 cursor-pointer overflow-hidden">
            
            <img 
                src={url_imagen} 
                alt={`Portada de ${titulo}`} 
                className="song-card-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://www.shutterstock.com/es/search/fallback"; }}
            />
            
            <div className="song-card-info">

                <h3>{titulo}</h3> 

                <p>{artista}</p> 
            </div>
            
            <button className="play-button" onClick={handlePlay}>Play</button>
        </div>
    );
}

export default SongCard;