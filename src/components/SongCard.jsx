import React from 'react';
import { useSongs } from '../context/SongsContext';
import "../assets/styles/SongCards.css";

function SongCard({ song }) {
    // Obtener la función de reproducción del contexto
    const { selectSong } = useSongs();

    // Lógica de compatibilidad de propiedades: usar CRUD (titulo/url_imagen) o Deezer (title/album.cover_medium)
    const titulo = song.titulo || song.title;
    const artista = song.artista || song.artist?.name;
    const url_imagen = song.imagenUrl || song.album?.cover_medium || song.imagen;
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
            className="song-card bg-neutral-900/60 hover:bg-neutral-800 rounded-xl p-3 text-center text-white transition-all duration-300 cursor-pointer flex flex-col h-full w-full"
            onClick={handlePlay}
        >
            {/* Contenedor de imagen cuadrado */}
            <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-lg">
                {url_imagen ? (
                    <img
                        src={url_imagen}
                        alt={`Portada de ${titulo}`}
                        className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
                    />
                ) : (
                    <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Sin imagen</span>
                    </div>
                )}
            </div>

            {/* Título y Artista con truncado para que no deformen la card */}
            <div className="mt-auto">
                <h4 className="text-base font-bold truncate leading-tight" title={titulo}>{titulo}</h4>
                <p className="text-xs text-gray-400 truncate mt-1">{artista}</p>
            </div>
        </div>
    );
}

export default SongCard;
