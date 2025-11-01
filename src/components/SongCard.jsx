import React, { useState, useEffect, useRef } from 'react';


const Canciones = () => {     //define estado inical de las secciones 
  const [secciones, setSecciones] = useState([
    { titulo: "Recomendadas", data: [], loading: true, error: null },
    { titulo: "Lo más escuchado", data: [], loading: true, error: null },
    { titulo: "Nuevos lanzamientos", data: [], loading: true, error: null },
    { titulo: "Top globales", data:[], loading: true, error: null},
  ]);

  const fetchCanciones = async (index, endpoint) => {     //funcion para traer las canciones
    try {

      const response = await fetch(endpoint);     //peticion http a la url
      if (!response.ok) throw new Error(` Error en HTTP ${response.status}`);
      const result = await response.json();  
      const tracks = result.data || [];  

      setSecciones(prev =>     //funcion para actualizar las secciones
        prev.map((sec, i) => 
          i === index ? { ...sec, data: tracks, loading: false, error: null } 
            : sec
        )
      )  

    }catch (error) {
      console.error(`Error en sección ${index}:`, error);

      setSecciones(prev =>     //actualiza las secciones con errores
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
    fetchCanciones(3, '/api/chart/0/tracks?limit=10')
  }, []);

  if (error) {
      return (
        <div className="mb-12"> {/*mostrar esto si hay un error con el la seccion*/}
          <h2 className="text-4xl font-bold text-white mb-6">{titulo}</h2>     
          <p className="text-red-500">Error: {error}</p>
        </div>
      );
    }


  const Cards = ({ titulo, data, loading, error }) => {     //funcion para no mostrar pantalla en blanco misenstras carga la pagina
  if (loading) {
    return ( //contenedores para las cards no cargadas
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">{titulo}</h2>
        <div className="flex space-x-4 pb-2">
          {[...Array(6)].map((_, i) => ( //modelo cada contenedores vacios de cards
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


  return (     //contendedores para las canciones cargadas exitosamente
      <div className="mb-12">     
        <h2 className="text-4xl font-bold text-white mb-6">{titulo}</h2>
        <div className="flex overflow-x-auto space-x-4 pb-2 [scrollbar-width:8px] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-600 transition-colors">  {/*todo esto para modificar el scrool */}
        
        {data.map((cancion, index) => (     //recorre las canciones
          <div
            key={cancion.id || index}
              className="shrink-0 w-44 bg-neutral-900 rounded-lg p-3 text-center text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
              //onClick={() => window.open(cancion.link, '_blank')}     //al hcaer click en una tarjeta te lleva a la cancion en deezer
              >

              {cancion.album?.cover_medium ? (   //coloca imagen en caso de tenerla 
                <img
                  src={cancion.album.cover_medium}
                  alt={cancion.title}
                  className="w-full h-44 object-cover rounded-md mb-2"/>
              ) : (
                <div className="bg-gray-700 border-2 border-gray-600 rounded-md w-full h-44 mb-2 flex items-center justify-center"> {/**contenedor para las cards sin imagenes */}
                  <span className="text-gray-500 text-xs">Sin imagen</span>
                </div>
              )}
              {/*//titulo y artista en la card */}
              <h4 className="text-lg font-semibold truncate">{cancion.title}</h4> 
              <p className="text-sm text-gray-400 truncate">{cancion.artist?.name}</p>
            </div>
          ))}
      </div>
    </div>
    );
  };


 
  










};
}
export default cancionCard
