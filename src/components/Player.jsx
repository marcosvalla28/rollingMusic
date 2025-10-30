
import React, { useRef, useEffect } from 'react';
import { useSongs } from '../context/SongsContext'; 

const Player = () => {

    const { currentSong } = useSongs(); 
    

    const audioRef = useRef(null); 
    

    const audioUrl = currentSong ? currentSong.url_cancion : '';


    useEffect(() => {
        if (audioUrl && audioRef.current) {
   
            audioRef.current.load();
            

            audioRef.current.play().catch(error => {

                console.warn("Reproducción automática bloqueada. El usuario debe interactuar con el reproductor.", error);
            });
        }
    }, [audioUrl]); 

    return (
        <div className="music-player-container">
             <audio 
                ref={audioRef} 
                id="music-player" 
                src={audioUrl} 
                controls 
                preload="auto" 
            />
            {currentSong && <p>Reproduciendo: {currentSong.titulo} - {currentSong.artista}</p>}
        </div>
    );
};

export default Player;