import React from "react";
import { useSongs } from "../context/SongsContext";
import { useNavigate } from "react-router-dom";

const Canciones = ({ songs }) => {
  const { selectSong } = useSongs();
  const navigate = useNavigate();

  if (!songs || songs.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 w-full py-4">
        {songs.map((item, index) => {
          const imageUrl = item.album?.cover_medium || item.cover_medium || item.imagenUrl || "https://via.placeholder.com/150";
          const title = item.title || item.titulo || item.name || "Título Desconocido";
          const artistName = item.artista || item.artist?.name || item.artist || "Artista Desconocido";
          const isPlayable = !!item.preview || (item.codigo_unico && item.codigo_unico.startsWith("crud-"));
          const handleClick = () => {
            if (isPlayable) {
              selectSong(item);
            } else {
              navigate("/notFound");
            }
          };

          return (
            <div
              key={item.codigo_unico || item.id || index}
              className={`rounded-lg p-3 text-center text-white transition-transform duration-300 ${isPlayable ? "bg-neutral-900 hover:scale-105 cursor-pointer" : "bg-neutral-800 opacity-60 cursor-not-allowed"}`}
              onClick={handleClick}
            >
              {" "}
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-44 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="bg-gray-700 border-2 border-gray-600 rounded-md w-full h-44 mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">Sin imagen</span>
                </div>
              )}
              {" "}
              <h4 className="text-lg font-semibold truncate">{title}</h4>
              {" "}
              <p className="text-sm text-gray-400 truncate">{artistName}</p>
              {" "}
            </div>
          );
        })}
        {" "}
      </div>
      {" "}
    </div>
  );
};

export default Canciones;
