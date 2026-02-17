import React, { useState, useEffect } from 'react';
import { useSongs } from "../context/SongsContext";
import { getTopTracks, getMostListened, getNewReleases, getGlobalTop } from '../services/musicApi';
import { useNavigate } from 'react-router-dom';

const CatalogoPorSecciones = () => {
    const { selectSong } = useSongs();
    const navigate = useNavigate();

    const [secciones, setSecciones] = useState([
        { titulo: "Recomendadas",       data: [], loading: true, error: null, fetcher: getTopTracks   },
        { titulo: "Lo más escuchado",   data: [], loading: true, error: null, fetcher: getMostListened },
        { titulo: "Nuevos lanzamientos",data: [], loading: true, error: null, fetcher: getNewReleases  },
        { titulo: "Top Global",         data: [], loading: true, error: null, fetcher: getGlobalTop   },
    ]);

    useEffect(() => {
        const loadSections = async () => {
            const loadedPromises = secciones.map(async (sec) => {
                try {
                    const results = await sec.fetcher();
                    return { ...sec, data: results, loading: false, error: null };
                } catch (error) {
                    console.error(`Error al cargar la sección ${sec.titulo}:`, error);
                    return { ...sec, loading: false, error: error.message };
                }
            });
            const newSections = await Promise.all(loadedPromises);
            setSecciones(newSections);
        };
        loadSections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Cards = ({ titulo, data, loading, error }) => {
        if (loading) return (
            <div className="mb-10 px-2 sm:px-4">
                <p className="text-violet-400 text-sm">Cargando {titulo}...</p>
            </div>
        );
        if (error) return (
            <div className="mb-10 px-2 sm:px-4">
                <p className="text-red-500 text-sm">Error al cargar {titulo}: {error}</p>
            </div>
        );
        if (data.length === 0) return (
            <div className="mb-10 px-2 sm:px-4">
                <p className="text-gray-500 text-sm">No se encontraron canciones para {titulo}.</p>
            </div>
        );

        return (
            <div className="mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6
                               border-l-4 border-violet-500 pl-3 mx-2 sm:mx-4">
                    {titulo}
                </h2>

                {/* Scroll horizontal con scrollbar estilizada */}
                <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 px-2 sm:px-4
                                [scrollbar-width:thin]
                                [scrollbar-color:#7c3aed_transparent]
                                [&::-webkit-scrollbar]:h-1.5
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:bg-purple-700
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                hover:[&::-webkit-scrollbar-thumb]:bg-violet-500">
                    {data.map((item, index) => {
                        const imageUrl   = item.album?.cover_medium || item.url_imagen;
                        const title      = item.title  || item.titulo || item.name;
                        const artistName = item.artist?.name || item.artista || 'Artista Desconocido';
                        const isPlayable = !!item.preview || !!item.url_cancion;

                        const handleClick = () => isPlayable ? selectSong(item) : navigate('/notFound');

                        return (
                            <div
                                key={item.id || index}
                                onClick={handleClick}
                                /* w-36 en móvil, w-44 en sm+ */
                                className={`shrink-0 w-36 sm:w-44 rounded-lg p-2 sm:p-3 text-center text-white
                                            transition-transform duration-300
                                            ${isPlayable
                                                ? 'bg-neutral-900 hover:scale-105 cursor-pointer'
                                                : 'bg-neutral-800 opacity-60 cursor-not-allowed'}`}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="w-full aspect-square object-cover rounded-md mb-2"
                                    />
                                ) : (
                                    <div className="bg-gray-700 border-2 border-gray-600 rounded-md w-full aspect-square mb-2 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">Sin imagen</span>
                                    </div>
                                )}
                                <h4 className="text-sm sm:text-base font-semibold truncate">{title}</h4>
                                <p  className="text-xs sm:text-sm text-gray-400 truncate">{artistName}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen py-4 sm:py-6">
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
    );
};

export default CatalogoPorSecciones;