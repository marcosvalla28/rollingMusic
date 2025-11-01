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


 
  










};

export default cancionCard
