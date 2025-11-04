
import React, { useState, useEffect } from 'react';
import { useSongs } from '../context/SongsContext';

const Canciones = () => {

  const { selectSong, setSongs } = useSongs(); // importo del context
  
  const [secciones, setSecciones] = useState([     //define estado inical de las secciones 
    { titulo: "Recomendadas", data: [], loading: true, error: null },
    { titulo: "Lo más escuchado", data: [], loading: true, error: null },
    { titulo: "Nuevos lanzamientos", data: [], loading: true, error: null },
    { titulo: "Top globales", data:[], loading: true, error: null},
  ]);

  const fetchCanciones = async (index, endpoint) => {     //funcion para traer las canciones
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Error en HTTP ${response.status}`);
      const result = await response.json();  
      const tracks = result.data || [];  

      setSecciones(prev =>     //funcion para actualizar las secciones
        prev.map((sec, i) => 
          i === index ? { ...sec, data: tracks, loading: false, error: null } 
            : sec
        )
      );

    } catch (error) {
      console.error(`Error en sección ${index}:`, error);
      setSecciones(prev =>
        prev.map((sec, i) =>
          i === index ? { ...sec, loading: false, error: error.message }
          : sec
        )   
      );               
    }
  };

  useEffect(() => {     //funcion para cargar canciones al arbir pagina
    fetchCanciones(0, '/api/search?q=rock&limit=10');
    fetchCanciones(1, '/api/chart/0/tracks?limit=10');     
    fetchCanciones(2, '/api/chart/0/albums?limit=10');
    fetchCanciones(3, '/api/chart/0/tracks?limit=10');
  }, []);

  

  // Función para manejar el click en una canción
  const handleCancionClick = (cancion) => {     //click en una cancion y cambiar formato para el player
    const cancionFormateada = {
      id: cancion.id,
      titulo: cancion.title,
      artista: cancion.artist?.name || 'Artista desconocido',
      url_cancion: cancion.preview,
      url_imagen: cancion.album?.cover_medium || cancion.album?.cover_small
    };   
    selectSong(cancionFormateada);
  };

  const Cards = ({ titulo, data, loading, error }) => {
    if (loading) {
      return (
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">{titulo}</h2>
          <div className="flex space-x-4 pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="shrink-0 w-44 bg-gray-800 rounded-lg p-3">
                <div className="w-full h-44 bg-gray-700 rounded-md mb-2"></div> 
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">{titulo}</h2>
          <p className="text-red-500">Error: {error}</p>
        </div>
      );
    }

    return (
      <div className="mb-12">     
        <h2 className="text-4xl font-bold text-white mb-6">{titulo}</h2>
        <div className="flex overflow-x-auto space-x-4 pb-2 [scrollbar-width:8px] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-600 transition-colors">
        
          {data.map((cancion, index) => (
            <div
              key={cancion.id || index}
              className="shrink-0 w-44 bg-neutral-900 rounded-lg p-3 text-center text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleCancionClick(cancion)}
            >
              {cancion.album?.cover_medium ? (
                <img
                  src={cancion.album.cover_medium}
                  alt={cancion.title}
                  className="w-full h-44 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="bg-gray-700 border-2 border-gray-600 rounded-md w-full h-44 mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Sin imagen</span>
                </div>
              )}
              
              <h4 className="text-lg font-semibold truncate">{cancion.title}</h4> 
              <p className="text-sm text-gray-400 truncate">{cancion.artist?.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="max-w-6xl mx-auto">  
        {secciones.map((seccion, index) => (
          <Cards
            key={index}
            titulo={seccion.titulo}
            data={seccion.data}
            loading={seccion.loading}
            error={seccion.error}
          />
        ))}
      </div>
    </div>
  );
};

export default Canciones;