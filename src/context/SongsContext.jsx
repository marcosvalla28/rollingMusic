import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import musicApi from "../services/musicApi";
import {
  getTopTracks,
  searchSongs as searchDeezer,
} from "../services/deezerService";
import Swal from "sweetalert2";

const SongsContext = createContext();

export const useSongs = () => useContext(SongsContext);

// Fuera del componente: no depende de ningún estado ni prop
const mapApiSongs = (apiResults) =>
  apiResults.map((song) => ({
    ...song,
    codigo_unico: `deezer-${song.id}`,
  }));

export const SongsProvider = ({ children }) => {
  const API_URL_FILES = import.meta.env.VITE_API_URL_FILES || "http://localhost:3000";

  const [songs, setSongs]           = useState([]);
  const [adminSongs, setAdminSongs] = useState([]);
  const [playlists, setPlaylists]   = useState([]);
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites]   = useState([]);

  // useCallback para que no se redefina en cada render
  const mapLocalSong = useCallback(
    (s) => ({
      ...s,
      id: s._id,
      title: s.title,
      artist: { name: s.artist },
      preview: `${API_URL_FILES}/uploads/songs/${s.audio}`,
      album: {
        cover_medium: s.cover?.startsWith("http")
          ? s.cover
          : `${API_URL_FILES}/uploads/covers/${s.cover}`,
      },
      codigo_unico: `local-${s._id}`,
    }),
    [API_URL_FILES]
  );

  const loadAdminSongs = useCallback(async () => {
    try {
      const response = await musicApi.get("/song");
      const songData = response?.data?.data ?? [];
      setAdminSongs(songData.map(mapLocalSong));
    } catch (err) {
      console.error("Error al cargar canciones locales:", err);
    }
  }, [mapLocalSong]);

  const loadPlaylists = useCallback(async () => {
    try {
      const response = await musicApi.get("/playlists");
      const playlistData = response.data.data || [];
      const mapped = playlistData.map((pl) => ({
        ...pl,
        img: pl.img?.startsWith("http")
          ? pl.img
          : `${API_URL_FILES}/uploads/playlists/${pl.img || "default-playlist.png"}`,
      }));
      setPlaylists(mapped);
    } catch (err) {
      console.error("Error al cargar playlists:", err);
      if (err.response?.status === 401) {
        setError("Sesión expirada. Por favor, inicia sesión de nuevo.");
      }
    }
  }, [API_URL_FILES]);

  const loadInitialSongs = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await getTopTracks();
      setSongs(mapApiSongs(results));
    } catch (err) {
      console.log(err);
      setError("Error al cargar el catálogo de Deezer.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const response = await musicApi.get("/favorites");
      setFavorites(response.data.data);
    } catch (err) {
      console.error("Error al cargar favoritos:", err);
    }
  }, []);

  // Ahora el useEffect puede declarar sus deps correctamente sin loop
  useEffect(() => {
    loadAdminSongs();
    loadInitialSongs();

    const token = localStorage.getItem("token");
    if (token) {
      loadFavorites();
      loadPlaylists();
    }
  }, [loadAdminSongs, loadInitialSongs, loadFavorites, loadPlaylists]);

  const toggleFavorite = useCallback(async (song) => {
    try {
      const songId = song.codigo_unico;
      const response = await musicApi.patch(`/favorites/${songId}`);
      if (response.data.ok) {
        setFavorites((prev) =>
          prev.includes(songId)
            ? prev.filter((id) => id !== songId)
            : [...prev, songId]
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Debes estar logueado para guardar favoritos", "error");
    }
  }, []);

  const handleSearch = useCallback(async (query, isGenre = false) => {
    if (!query.trim()) {
      setSearchTerm("");
      loadInitialSongs();
      loadAdminSongs();
      return;
    }
    setSearchTerm(query.trim());
    setIsLoading(true);
    setError(null);

    try {
      const deezerQuery = isGenre ? `genre:"${query.trim()}"` : query.trim();
      const deezerResults = await searchDeezer(deezerQuery);
      setSongs(mapApiSongs(deezerResults));

      const queryParam = isGenre ? `genre=${query.trim()}` : `term=${query.trim()}`;
      const myApiResults = await musicApi.get(`/song/search?${queryParam}`);

      if (myApiResults.data?.data) {
        setAdminSongs(myApiResults.data.data.map(mapLocalSong));
      }
    } catch (err) {
      console.error("Error en la búsqueda:", err);
      setAdminSongs([]);
    } finally {
      setIsLoading(false);
    }
  }, [loadInitialSongs, loadAdminSongs, mapLocalSong]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    loadInitialSongs();
    loadAdminSongs();
  }, [loadInitialSongs, loadAdminSongs]);

  const value = {
    songs,
    adminSongs,
    playlists,
    setPlaylists,
    loadPlaylists,
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
    toggleFavorite,
  };

  return (
    <SongsContext.Provider value={value}>{children}</SongsContext.Provider>
  );
};