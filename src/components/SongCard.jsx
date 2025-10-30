import React from 'react'

const cancionCard = () => {
  const secciones = [{
      titulo: "Recomendadas",
      canciones: [
        { imagen: "https://picsum.photos/200", titulo: "Blinding Lights", artista: "The Weeknd" },
        { imagen: "https://picsum.photos/200", titulo: "Levitating", artista: "Dua Lipa" },
        { imagen: "https://picsum.photos/200", titulo: "Peaches", artista: "Justin Bieber" },
        { imagen: "https://picsum.photos/200", titulo: "Good 4 U", artista: "Olivia Rodrigo" },
        { imagen: "https://picsum.photos/200", titulo: "Montero", artista: "Lil Nas X" },
        { imagen: "https://picsum.photos/200", titulo: "Stay", artista: "The Kid LAROI" },
      ],},
    {
      titulo: "Lo más escuchado",
      canciones: [
        { imagen: "https://picsum.photos/200", titulo: "Heat Waves", artista: "Glass Animals" },
        { imagen: "https://picsum.photos/200", titulo: "Industry Baby", artista: "Lil Nas X" },
        { imagen: "https://picsum.photos/200", titulo: "Shivers", artista: "Ed Sheeran" },
        { imagen: "https://picsum.photos/200", titulo: "Bad Habits", artista: "Ed Sheeran" },
        { imagen: "https://picsum.photos/200", titulo: "Butter", artista: "BTS" },
        { imagen: "https://picsum.photos/200", titulo: "Save Your Tears", artista: "The Weeknd" },
      ],},
    {
      titulo: "Nuevos lanzamientos",
      canciones: [
        { imagen: "https://picsum.photos/200", titulo: "Easy On Me", artista: "Adele" },
        { imagen: "https://picsum.photos/200", titulo: "Cold Heart", artista: "Elton John & Dua Lipa" },
        { imagen: "https://picsum.photos/200", titulo: "Smokin Out The Window", artista: "Bruno Mars" },
        { imagen: "https://picsum.photos/200", titulo: "Message In A Bottle", artista: "Taylor Swift" },
        { imagen: "https://picsum.photos/200", titulo: "Moth To A Flame", artista: "Swedish House Mafia" },
        { imagen: "https://picsum.photos/200", titulo: "One Right Now", artista: "Post Malone" },
      ],},
  ];

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
