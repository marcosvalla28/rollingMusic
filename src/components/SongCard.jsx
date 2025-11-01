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

        <div id={`song-${codigo_unico}`} className="song-card">
            
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