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


  const Cards = ({ titulo, data, loading, error }) => {     //funcion para no mostrar pantalla en blanco
  if (loading) { //cuando esten cargando las imagenes mostrar esto
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

 
  










};
}
export default cancionCard
