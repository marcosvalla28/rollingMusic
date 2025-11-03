const DEEZER_API_BASE = '/deezer';

const normalizeSong = (deezerTrack) => ({

  codigo_unico: deezerTrack.id.toString(),
  titulo: deezerTrack.title,
  artista: deezerTrack.artist.name,
  categoria: deezerTrack.album.title,
  url_imagen: deezerTrack.album.cover_medium,
  url_cancion: deezerTrack.preview,
  duracion: deezerTrack.duration
  
});

/**
 * Realiza una búsqueda de canciones en Deezer.
 * @param {string} query El término de búsqueda.
 * @returns {Promise<Array>} Un array de objetos de canciones normalizadas.
 */
export const searchSongs = async (query) => {
  if (!query) return [];
  
  const endpoint = `${DEEZER_API_BASE}/search?q=${encodeURIComponent(query)}`;

  console.log(`Buscando en: ${endpoint}`);

  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {

      throw new Error(`Deezer API respondió con estado: ${response.status}`);
    }

    const data = await response.json();
    
    return data.data.map(normalizeSong); 

  } catch (error) {
    console.error("😐 Fallo en la llamada a la API de Deezer:", error);

    return []; 
  }
};