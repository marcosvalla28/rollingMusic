import React, { useState, useEffect } from 'react';
import { useSongs } from "../context/SongsContext";
// Importamos las nuevas funciones de la API que definimos en musicApi.js
import { getTopTracks, getMostListened, getNewReleases, getGlobalTop } from '../services/musicApi';
import { useNavigate } from 'react-router-dom';

const CatalogoPorSecciones = () => {
    const { selectSong } = useSongs(); // Usado para reproducir la canción
    const navigate = useNavigate();

    // 1. Estado para gestionar las secciones, usando las funciones de la API como 'fetcher'
    const [secciones, setSecciones] = useState([
        // Utilizamos getTopTracks aquí para simular "Recomendadas"
        { titulo: "Recomendadas", data: [], loading: true, error: null, fetcher: getTopTracks },
        { titulo: "Lo más escuchado", data: [], loading: true, error: null, fetcher: getMostListened },
        { titulo: "Nuevos lanzamientos", data: [], loading: true, error: null, fetcher: getNewReleases },
        { titulo: "Top Global", data: [], loading: true, error: null, fetcher: getGlobalTop },
    ]);


    // 2. Función de carga general que usa las funciones de API importadas
    useEffect(() => {
        const loadSections = async () => {
            // Mapeamos y disparamos todas las llamadas de API en paralelo
            const loadedPromises = secciones.map(async (sec) => {
                try {
                    // Llama a la función fetcher asignada (ej: getMostListened)
                    const results = await sec.fetcher();
                    return { ...sec, data: results, loading: false, error: null };
                } catch (error) {
                    console.error(`Error al cargar la sección ${sec.titulo}:`, error);
                    return { ...sec, loading: false, error: error.message };
                }
            });

            // Esperamos a que todas las promesas terminen y actualizamos el estado
            const newSections = await Promise.all(loadedPromises);
            setSecciones(newSections);
        };

        loadSections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Se ejecuta solo al montar


    // 3. Componente interno para renderizar cada fila (Cards)
    const Cards = ({ titulo, data, loading, error }) => {

        if (loading) {
            // Rediseño simple del loading
            return <div className="mb-12"><p className="text-violet-400">Cargando {titulo}...</p></div>;
        }
        if (error) {
            return <div className="mb-12"><p className="text-red-500">Error al cargar {titulo}: {error}</p></div>;
        }
        if (data.length === 0) {
            return <div className="mb-12"><p className="text-gray-500">No se encontraron canciones para {titulo}.</p></div>;
        }

        return (
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-violet-500 pl-2">{titulo}</h2>
                <div className="flex overflow-x-auto space-x-4 pb-2 [scrollbar-width:8px] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-gray-900 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-600 transition-colors">

                    {data.map((item, index) => {
                        // Aseguramos que la estructura de la tarjeta soporte los objetos del CRUD y de la API
                        // La API devuelve 'title', 'artist.name' y 'album.cover_medium'
                        const imageUrl = item.album?.cover_medium || item.url_imagen;
                        const title = item.title || item.titulo || item.name;
                        const artistName = item.artist?.name || item.artista || 'Artista Desconocido';

                        const isPlayable = !!item.preview || !!item.url_cancion;
                        const handleClick = () => {
                            if (isPlayable) {
                                selectSong(item);
                            } else {
                                navigate('/notFound');
                            }
                        };

                        return (
                            <div
                                key={item.id || index}
                                className={`shrink-0 w-44 rounded-lg p-3 text-center text-white transition-transform duration-300 ${isPlayable ? 'bg-neutral-900 hover:scale-105 cursor-pointer' : 'bg-neutral-800 opacity-60 cursor-not-allowed'}`}
                                onClick={handleClick}
                            >

                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="w-full h-44 object-cover rounded-md mb-2" />
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


    // 4. Renderizado principal: Mapea sobre las secciones y llama a Cards
    return (
        <div className=" min-h-screen">
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