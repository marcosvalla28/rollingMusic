import React from 'react';
import { useSongs } from '../context/SongsContext'; 
import "../assets/styles/SongCards.css";

function SongCard({ song }) { 
    // Obtener la función de reproducción del contexto
    const { selectSong } = useSongs();

    // Lógica de compatibilidad de propiedades: usar CRUD (titulo/url_imagen) o Deezer (title/album.cover_medium)
    const titulo = song.titulo || song.title; 
    const artista = song.artista || song.artist?.name; 
    const url_imagen = song.imagenUrl || song.album?.cover_medium; 
    const codigo_unico = song.codigo_unico || song.id; 

    const handlePlay = () => {
        // 🔑 FUNCIÓN CLAVE: Envía el objeto de la canción al SongsContext para reproducir
        selectSong(song);
        

    }
    
    // Si la canción no tiene datos válidos, no se renderiza.
    if (!titulo) return null;

    return (
        <div 
            id={`song-${codigo_unico}`} 
            // Usa los estilos que definieron tus compañeros para una tarjeta
            className="song-card bg-neutral-900 rounded-lg p-3 text-center text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={handlePlay} // 👈 Conecta la reproducción al clic
        >
            {/* Lógica de imagen */}
            {url_imagen ? (
                <img 
                    src={url_imagen} 
                    alt={`Portada de ${titulo}`} 
                     className="song-image rounded-md mb-2"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150"; }}
                />
            ) : (
                <div className="bg-gray-700 border-2 border-gray-600 rounded-md song-image mb-2 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Sin imagen</span>
                </div>
            )}
            
            {/* Título y Artista compatibles */}
            <h4 className="text-lg font-semibold truncate">{titulo}</h4> 
            <p className="text-sm text-gray-400 truncate">{artista}</p> 
        </div>
    );
}

export default SongCard;
