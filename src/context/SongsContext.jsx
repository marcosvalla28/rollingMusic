import React, { createContext, useContext, useState, useEffect } from 'react';
// Asegúrate de que esta ruta a tu API sea correcta
import { searchSongs, getTopTracks } from '../services/musicApi'; 

const SongsContext = createContext();

export const useSongs = () => useContext(SongsContext);

export const SongsProvider = ({ children }) => {
    // 1. Estados de API/Búsqueda 
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    
    // 2. Estado para el CRUD de Administración (Lista de Reproducción)
    const [adminSongs, setAdminSongs] = useState(() => {
        // LECTURA SÍNCRONA: Intentamos leer los datos al iniciar
        try {
            const storedSongs = localStorage.getItem('adminSongs');
            if (storedSongs) {
                const parsedSongs = JSON.parse(storedSongs);
                // Asegura que sea un array
                return Array.isArray(parsedSongs) ? parsedSongs : [];
            }
            return [];
        } catch (e) {
            console.error("Error al inicializar adminSongs desde localStorage. Reiniciando lista.", e);
            localStorage.removeItem('adminSongs');
            return [];
        }
    });

    // EFECTO CLAVE: Sincroniza CRUD con localStorage CADA VEZ que adminSongs cambie.
    // Esto fuerza la re-renderización de los componentes hijos que usan 'adminSongs' (como Home.jsx).
    useEffect(() => {
        localStorage.setItem('adminSongs', JSON.stringify(adminSongs));
    }, [adminSongs]); 

    // FUNCIONES CRUD
    const addSong = (newSongData) => {
        const newId = Date.now().toString(); 
        const newAdminSong = { 
            ...newSongData, 
            codigo_unico: `crud-${newId}`, // ID único para CRUD
            isPublished: true, 
            addedAt: new Date().toISOString() 
        };
        // Al llamar a setAdminSongs, se dispara el useEffect de arriba
        setAdminSongs((prevSongs) => [...prevSongs, newAdminSong]);
    };

    const updateSong = (idToUpdate, updatedFields) => {
        setAdminSongs((prevSongs) => prevSongs.map((song) => song.codigo_unico === idToUpdate ? { ...song, ...updatedFields } : song));
    };

    const deleteSong = (idToDelete) => {
        setAdminSongs((prevSongs) => prevSongs.filter((song) => song.codigo_unico !== idToDelete));
    };
    
    // Funciones de API
    const mapApiSongs = (apiResults) => {
        return apiResults.map(song => ({
            ...song,
            codigo_unico: `api-${song.id || song.codigo_unico || Date.now() + Math.random()}`, // ID único para API
        }));
    };

    const loadInitialSongs = async () => {
        setIsLoading(true);
        setError(null);
        setSongs([]); 

        try {
            const results = await getTopTracks(); 
            setSongs(mapApiSongs(results));
        } catch (err) {
            setError("Error al cargar el catálogo principal. Intenta recargar.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadInitialSongs();
    }, []);
    
    const handleSearch = async (query) => {
        if (!query.trim()) {
            setSearchTerm('');
            loadInitialSongs();
            return;
        }

        setSearchTerm(query.trim());
        setIsLoading(true);
        setError(null);
        setSongs([]); 

        try {
            const results = await searchSongs(query.trim());
            setSongs(mapApiSongs(results));
        } catch (err) {
            setError("Error al cargar canciones. Intenta de nuevo.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const selectSong = (song) => setCurrentSong(song);

    const clearSearch = () => {
    setSearchTerm('');
    loadInitialSongs(); // Recarga el catálogo inicial (Top Tracks)
    };
    
    const value = {
        songs: songs, 
        isLoading,
        error,
        handleSearch,
        clearSearch,
        searchTerm, 
        currentSong,
        setCurrentSong, 
        selectSong,
        adminSongs, // El array de canciones del CRUD que Home necesita
        addSong,
        updateSong,
        deleteSong,
    };

    return <SongsContext.Provider value={value}>{children}</SongsContext.Provider>;
};