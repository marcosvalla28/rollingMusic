import React, { useState, useEffect, useRef } from 'react';


const Canciones = () => {     //define estado inical de las secciones 
  const [secciones, setSecciones] = useState([
    { titulo: "Recomendadas", data: [], loading: true, error: null },
    { titulo: "Lo más escuchado", data: [], loading: true, error: null },
    { titulo: "Nuevos lanzamientos", data: [], loading: true, error: null },
    { titulo: "Top globales", data:[], loading: true, error: null},
  ]);


  const Cards = ({ titulo, canciones }) => (
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-white mb-6">{titulo}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-black">
        {canciones.map((cancion, index) => (
          <div
            key={index}
            className="shrink-0 w-44 bg-neutral-900 rounded-lg p-3 text-center text-white hover:scale-105 transition-transform duration-300 cursor-pointer">
            {cancion.imagen ? (
              <img
                src={cancion.imagen}
                alt={cancion.titulo}
                className="w-full h-44 object-cover rounded-md mb-2"
                loading="lazy"
              />
            ) : (
              <div className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-md w-full h-44 mb-2 flex items-center justify-center">
                <span className="text-gray-500 text-xs">Sin imagen</span>
              </div>
            )}

            <h4 className="text-lg font-semibold truncate">{cancion.titulo}</h4>
            <p className="text-sm text-gray-400 truncate">{cancion.artista}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {secciones.map((seccion, index) => (
          <Cards
            key={index}
            titulo={seccion.titulo}
            canciones={seccion.canciones}
          />
        ))}
      </div>
    </div>
  );
};

export default cancionCard
