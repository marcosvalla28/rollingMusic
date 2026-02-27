import { useState, useEffect } from 'react';
import { useSongs } from '../context/SongsContext.jsx';
import Footer from '../components/Footer.jsx';

const DEEZER_API_BASE = '/api';

const fetchAlbums = async () => {
    const res = await fetch(`${DEEZER_API_BASE}/chart/0/albums?limit=24`);
    if (!res.ok) throw new Error('Error al cargar álbumes');
    const data = await res.json();
    return data.data || [];
};

const fetchAlbumTracks = async (albumId) => {
    const res = await fetch(`${DEEZER_API_BASE}/album/${albumId}/tracks`);
    if (!res.ok) throw new Error('Error al cargar canciones');
    const data = await res.json();
    return data.data || [];
};

const Album = () => {
    const { selectSong } = useSongs();

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [tracksLoading, setTracksLoading] = useState(false);

    useEffect(() => {
        fetchAlbums()
            .then(setAlbums)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleAlbumClick = async (album) => {
        setSelectedAlbum(album);
        setTracksLoading(true);
        setTracks([]);
        try {
            const t = await fetchAlbumTracks(album.id);
            setTracks(t.map(track => ({
                ...track,
                codigo_unico: `deezer-${track.id}`,
                album: { cover_medium: album.cover_medium, title: album.title },
            })));
        } catch {
            setTracks([]);
        } finally {
            setTracksLoading(false);
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '--:--';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
          <>
        <div className="min-h-full bg-black text-white">

            {/* DETAILS */}
            {selectedAlbum ? (
                <div className="animate-fade-in">
                    {/* Hero */}
                    <div
                        className="relative flex flex-col md:flex-row items-end gap-6 p-8 pb-10"
                        style={{
                            background: `linear-gradient(to bottom, rgba(109,40,217,0.35) 0%, transparent 100%)`,
                        }}
                    >
                        <button
                            onClick={() => setSelectedAlbum(null)}
                            className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver
                        </button>

                        <img
                            src={selectedAlbum.cover_xl || selectedAlbum.cover_medium}
                            alt={selectedAlbum.title}
                            className="w-44 h-44 md:w-56 md:h-56 rounded-xl object-cover shadow-2xl mt-10 md:mt-0 shrink-0 border border-white/10"
                        />
                        <div>
                            <p className="text-xs uppercase tracking-widest text-violet-400 font-bold mb-1">Álbum</p>
                            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-3">
                                {selectedAlbum.title}
                            </h1>
                            <p className="text-gray-300 text-lg font-semibold">{selectedAlbum.artist?.name}</p>
                            <p className="text-gray-500 text-sm mt-1">{selectedAlbum.nb_tracks} canciones</p>
                        </div>
                    </div>

                    {/* Track list */}
                    <div className="px-4 md:px-8 pb-8">
                        {tracksLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : tracks.length === 0 ? (
                            <p className="text-center text-gray-500 py-20">No se pudieron cargar las canciones.</p>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-widest">
                                        <th className="py-3 px-2 text-left w-10">#</th>
                                        <th className="py-3 px-2 text-left">Título</th>
                                        <th className="py-3 px-2 text-right">Duración</th>
                                        <th className="py-3 px-2 text-right w-16"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tracks.map((track, i) => {
                                        const isPlayable = !!track.preview;
                                        return (
                                            <tr
                                                key={track.id}
                                                onClick={() => isPlayable && selectSong(track)}
                                                className={`group border-b border-white/5 transition-colors
                                                    ${isPlayable ? 'hover:bg-white/5 cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
                                            >
                                                <td className="py-3 px-2 text-gray-500 group-hover:text-violet-400 transition-colors">
                                                    <span className="group-hover:hidden">{i + 1}</span>
                                                    <svg className="hidden group-hover:block w-4 h-4 fill-violet-400" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <p className="font-medium text-white group-hover:text-violet-300 transition-colors truncate max-w-xs">
                                                        {track.title}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">{track.artist?.name}</p>
                                                </td>
                                                <td className="py-3 px-2 text-right text-gray-500 tabular-nums">
                                                    {formatDuration(track.duration)}
                                                </td>
                                                <td className="py-3 px-2 text-right">
                                                    {!isPlayable && (
                                                        <span className="text-[10px] text-gray-600 uppercase tracking-wider">Sin preview</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Footer />
                </div>
            ) : (
                /* GRID VIEW */
                <div className="p-4 md:p-8 animate-fade-in">
                    <h2 className="text-3xl font-black text-violet-400 mb-2 border-b border-violet-900/30 pb-4">
                        Álbumes Destacados
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">Vía Deezer Charts · Hacé clic para ver las canciones</p>

                    {loading ? (
                        <div className="flex justify-center py-32">
                            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">{error}</div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                            {albums.map(album => (
                                <div
                                    key={album.id}
                                    onClick={() => handleAlbumClick(album)}
                                    className="group cursor-pointer bg-neutral-900/40 hover:bg-neutral-800 rounded-xl p-3 transition-all duration-300 hover:-translate-y-1 shadow-lg border border-white/5"
                                >
                                    <div className="relative overflow-hidden rounded-lg mb-3 aspect-square shadow-md shadow-black/50">
                                        <img
                                            src={album.cover_medium}
                                            alt={album.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://i.ibb.co/ZRn36S2x/Cover-Default-Playlist.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-violet-600 p-3 rounded-full shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform">
                                                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-bold truncate text-gray-100 group-hover:text-violet-400 transition-colors">
                                        {album.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 truncate mt-1">{album.artist?.name}</p>
                                    {album.nb_tracks && (
                                        <p className="text-[10px] text-gray-600 mt-1">{album.nb_tracks} canciones</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
             <Footer />
             </>
    );
};

export default Album;