import React, { createContext, useContext, useState, useEffect } from 'react';
import musicApi from '../services/musicApi'; 
import { getTopTracks, searchSongs as searchDeezer } from '../services/deezerService'; 
import Swal from 'sweetalert2';

const SongsContext = createContext();
export const useSongs = () => useContext(SongsContext);

export const SongsProvider = ({ children }) => {
    const API_URL_FILES = import.meta.env.VITE_API_URL_FILES || 'http://localhost:3000';

    const [songs, setSongs] = useState([]); 
    const [adminSongs, setAdminSongs] = useState([]); 
    const [playlists, setPlaylists] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [favorites, setFavorites] = useState([]);

    // --- 🛠️ FUNCIÓN DE MAPEO CENTRALIZADA CORREGIDA ---
    const mapLocalSong = (s) => ({
        ...s,
        id: s._id,
        title: s.title,
        artist: { name: s.artist },
        // 🛠️ Usamos 'audio' y 'cover' que son los nombres de tu controlador
        preview: `${API_URL_FILES}/uploads/songs/${s.audio}`, 
        album: { 
            cover_medium: s.cover?.startsWith('http') 
                ? s.cover 
                : `${API_URL_FILES}/uploads/covers/${s.cover}` 
        },
        codigo_unico: `local-${s._id}`
    });

    // --- CARGA DE DATOS DESDE TU BACKEND ---
    const loadAdminSongs = async () => {
        try {
            const response = await musicApi.get('/song');
            const mapped = response.data.data.map(mapLocalSong);
            setAdminSongs(mapped);
        } catch (err) {
            console.error("Error al cargar canciones locales:", err);
        }
    };

    const loadPlaylists = async () => {
    try {
        const response = await musicApi.get('/playlists');
        
        // Verificamos que 'data' exista para evitar errores de undefined
        const playlistData = response.data.data || [];
        
        const mapped = playlistData.map(pl => ({
            ...pl,
            // 🛠️ IMPORTANTE: Usamos la subcarpeta correcta de tu Multer
            img: pl.img?.startsWith('http') 
                ? pl.img 
                : `${API_URL_FILES}/uploads/playlists/${pl.img || 'default-playlist.png'}`
        }));
        
        setPlaylists(mapped);
    } catch (err) {
        console.error("Error al cargar playlists:", err);
        // Si hay un error 401/403, es probable que el token haya expirado
        if (err.response?.status === 401) {
            setError("Sesión expirada. Por favor, inicia sesión de nuevo.");
        }
    }
};

    // --- CARGA DE DATOS DESDE DEEZER ---
    const loadInitialSongs = async () => {
        setIsLoading(true);
        try {
            const results = await getTopTracks(); 
            setSongs(mapApiSongs(results));
        } catch (err) {
            setError("Error al cargar el catálogo de Deezer.");
        } finally {
            setIsLoading(false);
        }
    };

    const mapApiSongs = (apiResults) => {
        return apiResults.map(song => ({
            ...song,
            codigo_unico: `deezer-${song.id}`,
        }));
    };

    const loadFavorites = async () => {
        try {
            const response = await musicApi.get('/favorites');
            setFavorites(response.data.data); 
        } catch (err) {
            console.error("Error al cargar favoritos:", err);
        }
    };

    const toggleFavorite = async (song) => {
        try {
            const songId = song.codigo_unico;
            const response = await musicApi.patch(`/favorites/${songId}`);
            if (response.data.ok) {
                setFavorites(prev => 
                    prev.includes(songId) 
                    ? prev.filter(id => id !== songId) 
                    : [...prev, songId]
                );
                Swal.fire({
                    toast: true, position: 'top-end', icon: 'success',
                    title: response.data.message, showConfirmButton: false, timer: 2000
                });
            }
        } catch (err) {
            Swal.fire('Error', 'Debes estar logueado para guardar favoritos', 'error');
        }
    };

    useEffect(() => {
        loadAdminSongs();
        loadInitialSongs();
        
        const token = localStorage.getItem('token');
        if (token) {
            loadFavorites();
            loadPlaylists(); 
        }
    }, []);

    const handleSearch = async (query, isGenre = false) => {
    if (!query.trim()) {
        clearSearch();
        return;
    }
    setSearchTerm(query.trim());
    setIsLoading(true);
    setError(null);

    try {
        // 1. Búsqueda en Deezer
        // 🛠️ Si es género, enviamos 'genre:"Rock"', si no, el término normal
        const deezerQuery = isGenre ? `genre:"${query.trim()}"` : query.trim();
        const deezerResults = await searchDeezer(deezerQuery);
        setSongs(mapApiSongs(deezerResults));

        // 2. Búsqueda en tu API Local
        const queryParam = isGenre ? `genre=${query.trim()}` : `term=${query.trim()}`;
        const myApiResults = await musicApi.get(`/song/search?${queryParam}`);
        
        if (myApiResults.data && myApiResults.data.data) {
            setAdminSongs(myApiResults.data.data.map(mapLocalSong));
        }
    } catch (err) {
        console.error("Error en la búsqueda:", err);
        setAdminSongs([]);
    } finally {
        setIsLoading(false);
    }
};

    const clearSearch = () => {
        setSearchTerm('');
        loadInitialSongs();
        loadAdminSongs();
    };

    const value = {
        songs, 
        adminSongs, 
        playlists, 
        setPlaylists,
        loadPlaylists, // 🛠️ Exponemos la función para que el modal pueda actualizar la lista
        isLoading, 
        error, 
        searchTerm, 
        currentSong,
        setCurrentSong, 
        handleSearch, 
        clearSearch,
        selectSong: (song) => setCurrentSong(song),
        syncSongs: loadAdminSongs,
        favorites, 
        toggleFavorite
    };

    return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>;
};