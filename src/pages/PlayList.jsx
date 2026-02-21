import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSongs } from '../context/SongsContext'; 
import Canciones from '../components/Canciones.jsx';
import Footer from '../components/Footer.jsx';
import musicApi from '../services/musicApi';
import Swal from 'sweetalert2';

// Fuera del componente: es una constante de entorno, nunca cambia
const API_URL_FILES = import.meta.env.VITE_API_URL_FILES || 'http://localhost:3000';

function PlayList() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { adminSongs, songs, isLoading: songsLoading, loadPlaylists } = useSongs();
    
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleEditPlaylist = useCallback(async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Playlist',
            background: '#171717',
            color: '#fff',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="${currentPlaylist.name}" style="background:#262626;color:white;border:1px solid #404040">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Descripción" value="${currentPlaylist.description || ''}" style="background:#262626;color:white;border:1px solid #404040">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Guardar cambios',
            preConfirm: () => ({
                name: document.getElementById('swal-input1').value,
                description: document.getElementById('swal-input2').value,
            }),
        });

        if (formValues) {
            try {
                const response = await musicApi.put(`/playlists/${id}`, formValues);
                if (response.data.ok) {
                    setCurrentPlaylist(prev => ({ ...prev, ...formValues }));
                    if (loadPlaylists) await loadPlaylists();
                    Swal.fire({ icon: 'success', title: 'Actualizado', background: '#171717', color: '#fff' });
                }
            } catch {
                Swal.fire('Error', 'No se pudo actualizar', 'error');
            }
        }
    }, [id, currentPlaylist, loadPlaylists]);

    const handleRemoveSong = useCallback(async (songId) => {
        try {
            const response = await musicApi.delete(`/playlists/${id}/songs/${songId}`);
            if (response.data.ok) {
                setPlaylistSongs(prev => prev.filter(s => s.codigo_unico !== songId));
                Swal.fire({
                    toast: true, position: 'top-end', icon: 'success',
                    title: 'Canción quitada', showConfirmButton: false,
                    timer: 2000, background: '#171717', color: '#fff',
                });
            }
        } catch {
            Swal.fire('Error', 'No se pudo quitar la canción', 'error');
        }
    }, [id]);

    const handleDeletePlaylist = useCallback(async () => {
        const result = await Swal.fire({
            title: '¿Eliminar esta lista?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar',
            background: '#171717',
            color: '#fff',
        });

        if (result.isConfirmed) {
            try {
                const response = await musicApi.delete(`/playlists/${id}`);
                if (response.data.ok) {
                    if (loadPlaylists) await loadPlaylists();
                    navigate('/');
                }
            } catch {
                Swal.fire('Error', 'No se pudo eliminar', 'error');
            }
        }
    }, [id, loadPlaylists, navigate]);

    useEffect(() => {
        const fetchPlaylistData = async () => {
            setLoading(true);
            try {
                const response = await musicApi.get(`/playlists/${id}`);
                if (response.data.ok) {
                    const plData = response.data.data;
                    const formattedPlaylist = {
                        ...plData,
                        img: plData.img?.startsWith('http')
                            ? plData.img
                            : `${API_URL_FILES}/uploads/playlists/${plData.img}`,
                    };
                    setCurrentPlaylist(formattedPlaylist);
                    const allAvailableSongs = [...adminSongs, ...songs];
                    const foundSongs = plData.songs
                        .map(songId => allAvailableSongs.find(s => s.codigo_unico === songId))
                        .filter(Boolean);
                    setPlaylistSongs(foundSongs);
                }
            } catch (error) {
                if (error.response?.status === 404) navigate('/');
            } finally {
                setLoading(false);
            }
        };

        if (id && adminSongs.length > 0) fetchPlaylistData();
    }, [id, adminSongs, songs, navigate]); // API_URL_FILES ya no es dep porque está fuera

    return (
        <div className="w-full bg-linear-to-b from-blue-900/20 to-black min-h-full">

            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-8 bg-linear-to-b from-blue-600/20 to-transparent">
                <div className="w-48 h-48 bg-neutral-800 shadow-2xl flex items-center justify-center rounded-lg border border-white/10 overflow-hidden shrink-0">
                    {currentPlaylist?.img ? (
                        <img src={currentPlaylist.img} alt={currentPlaylist.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-6xl">🎵</span>
                    )}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Lista de Reproducción</p>
                    <h1 className="text-4xl md:text-7xl font-black mt-2 mb-4 text-white">
                        {currentPlaylist?.name || 'Cargando...'}
                    </h1>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-gray-400 font-medium">
                            {playlistSongs.length} canciones • {currentPlaylist?.description || 'Sin descripción'}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleEditPlaylist}
                                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                            >
                                EDITAR
                            </button>
                            <button
                                onClick={handleDeletePlaylist}
                                className="px-4 py-1.5 rounded-full border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
                            >
                                ELIMINAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8">
                {(loading || songsLoading) ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : playlistSongs.length === 0 ? (
                    <div className="text-center py-20 bg-neutral-900/40 rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-400 text-xl font-medium">Esta lista está vacía.</p>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <Canciones songs={playlistSongs} onRemoveSong={handleRemoveSong} isPlaylistView={true} />
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default PlayList;