import { useState, useEffect } from 'react';
import { useSongs } from '../context/SongsContext';
import Footer from '../components/Footer.jsx';

const DEEZER_API_BASE = '/api';

const fetchArtists = async () => {
    const res = await fetch(`${DEEZER_API_BASE}/chart/0/artists?limit=24`);
    if (!res.ok) throw new Error('Error al cargar artistas');
    const data = await res.json();
    return data.data || [];
};

const fetchArtistTopTracks = async (artistId) => {
    const res = await fetch(`${DEEZER_API_BASE}/artist/${artistId}/top?limit=20`);
    if (!res.ok) throw new Error('Error al cargar canciones');
    const data = await res.json();
    return data.data || [];
};

const fetchArtistAlbums = async (artistId) => {
    const res = await fetch(`${DEEZER_API_BASE}/artist/${artistId}/albums?limit=8`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
};

const Artist = () => {
    const { selectSong } = useSongs();

    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedArtist, setSelectedArtist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        fetchArtists()
            .then(setArtists)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const handleArtistClick = async (artist) => {
        setSelectedArtist(artist);
        setDetailLoading(true);
        setTracks([]);
        setAlbums([]);
        try {
            const [t, a] = await Promise.all([
                fetchArtistTopTracks(artist.id),
                fetchArtistAlbums(artist.id),
            ]);
            setTracks(t.map(track => ({
                ...track,
                codigo_unico: `deezer-${track.id}`,
            })));
            setAlbums(a);
        } catch {
            setTracks([]);
            setAlbums([]);
        } finally {
            setDetailLoading(false);
        }
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '--:--';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const formatFans = (n) => {
        if (!n) return '';
        if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M fans`;
        if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K fans`;
        return `${n} fans`;
    };

    return (
        <div className="min-h-full bg-black text-white">

            {/* ── DETAIL VIEW ── */}
            {selectedArtist ? (
                <div className="animate-fade-in">
                    {/* Hero */}
                    <div className="relative flex flex-col md:flex-row items-end gap-6 p-8 pb-10"
                        style={{ background: 'linear-gradient(to bottom, rgba(109,40,217,0.35) 0%, transparent 100%)' }}
                    >
                        <button
                            onClick={() => setSelectedArtist(null)}
                            className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver
                        </button>

                        <img
                            src={selectedArtist.picture_xl || selectedArtist.picture_medium}
                            alt={selectedArtist.name}
                            className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover shadow-2xl mt-10 md:mt-0 shrink-0 border-4 border-violet-600/40"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://i.ibb.co/ZRn36S2x/Cover-Default-Playlist.jpg'; }}
                        />
                        <div>
                            <p className="text-xs uppercase tracking-widest text-violet-400 font-bold mb-1">Artista</p>
                            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-3">
                                {selectedArtist.name}
                            </h1>
                            {selectedArtist.nb_fan && (
                                <p className="text-gray-400 text-sm">{formatFans(selectedArtist.nb_fan)}</p>
                            )}
                        </div>
                    </div>

                    {detailLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="px-4 md:px-8 pb-8 space-y-10">

                            {/* Top Tracks */}
                            {tracks.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-black mb-4 border-l-4 border-violet-500 pl-3">
                                        Canciones Populares
                                    </h2>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-widest">
                                                <th className="py-3 px-2 text-left w-10">#</th>
                                                <th className="py-3 px-2 text-left">Título</th>
                                                <th className="py-3 px-2 text-left hidden md:table-cell">Álbum</th>
                                                <th className="py-3 px-2 text-right">Duración</th>
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
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    src={track.album?.cover_medium}
                                                                    alt={track.title}
                                                                    className="w-10 h-10 rounded object-cover shrink-0 hidden sm:block"
                                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                                />
                                                                <p className="font-medium text-white group-hover:text-violet-300 transition-colors truncate max-w-[180px] md:max-w-xs">
                                                                    {track.title}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-2 text-gray-500 truncate max-w-[140px] hidden md:table-cell">
                                                            {track.album?.title}
                                                        </td>
                                                        <td className="py-3 px-2 text-right text-gray-500 tabular-nums">
                                                            {formatDuration(track.duration)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Albums */}
                            {albums.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-black mb-4 border-l-4 border-violet-500 pl-3">
                                        Discografía
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                        {albums.map(album => (
                                            <div key={album.id} className="bg-neutral-900/40 p-3 rounded-xl border border-white/5">
                                                <img
                                                    src={album.cover_medium}
                                                    alt={album.title}
                                                    className="w-full aspect-square object-cover rounded-lg mb-2"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://i.ibb.co/ZRn36S2x/Cover-Default-Playlist.jpg'; }}
                                                />
                                                <p className="text-sm font-bold truncate text-gray-100">{album.title}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {album.release_date ? album.release_date.slice(0, 4) : ''}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <Footer />
                </div>
            ) : (
                /* ── GRID VIEW ── */
                <div className="p-4 md:p-8 animate-fade-in">
                    <h2 className="text-3xl font-black text-violet-400 mb-2 border-b border-violet-900/30 pb-4">
                        Artistas Destacados
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">Vía Deezer Charts · Hacé clic para ver su perfil</p>

                    {loading ? (
                        <div className="flex justify-center py-32">
                            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">{error}</div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                            {artists.map(artist => (
                                <div
                                    key={artist.id}
                                    onClick={() => handleArtistClick(artist)}
                                    className="group cursor-pointer bg-neutral-900/40 hover:bg-neutral-800 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 shadow-lg border border-white/5"
                                >
                                    <div className="relative overflow-hidden rounded-full mb-3 aspect-square shadow-md shadow-black/50 mx-auto w-full">
                                        <img
                                            src={artist.picture_medium}
                                            alt={artist.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://i.ibb.co/ZRn36S2x/Cover-Default-Playlist.jpg'; }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                            <div className="bg-violet-600 p-3 rounded-full shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform">
                                                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-bold truncate text-gray-100 group-hover:text-violet-400 transition-colors">
                                        {artist.name}
                                    </h4>
                                    {artist.nb_fan && (
                                        <p className="text-xs text-gray-500 mt-1">{formatFans(artist.nb_fan)}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Artist;