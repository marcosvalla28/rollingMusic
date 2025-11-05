import React from 'react';
import { useSongs } from "../context/SongsContext"; 

const Canciones = ({ songs }) => {     
  const { selectSong } = useSongs();

  if (!songs || songs.length === 0) {
    return null; 
  }

  return (     
    <div className="mb-12">     
      
      {/* USO DE GRID: Define las columnas según el tamaño de pantalla para alineación perfecta */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-2">
        
        {songs.map((item, index) => { 
            const imageUrl = item.album?.cover_medium || item.cover_medium || item.coverUrl || 'https://via.placeholder.com/150'; 
            const title = item.title || item.titulo || item.name || 'Título Desconocido';
            const artistName = item.artista || item.artist?.name || item.artist || 'Artista Desconocido';; 
            
            const isPlayable = !!item.preview || (item.codigo_unico && item.codigo_unico.startsWith('crud-')); 
            
            const handleClick = () => {
                if(isPlayable) {
                    selectSong(item);
                } else {
                    console.log('Este elemento no tiene audio disponible para reproducir.');
                }
            };

            return (
          <div
            key={item.codigo_unico || item.id || index} 
                // La clase no tiene width fijo, el grid se encarga de dimensionarla
            className={`rounded-lg p-3 text-center text-white transition-transform duration-300 ${isPlayable ? 'bg-neutral-900 hover:scale-105 cursor-pointer' : 'bg-neutral-800 opacity-60 cursor-not-allowed'}`}
            onClick={handleClick}     
              >

              {imageUrl ? (   
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-44 object-cover rounded-md mb-2"/>
              ) : (
                <div className="bg-gray-700 border-2 border-gray-600 rounded-md w-full h-44 mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Sin imagen</span>
                </div>
              )}
              
              <h4 className="text-lg font-semibold truncate">{title}</h4> 
              <p className="text-sm text-gray-400 truncate">{artistName}</p>
          </div>
            );
        })}
      </div>
    </div>
    );
};

export default Canciones;