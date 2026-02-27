import { useEffect, useState } from 'react';
import { useSongs } from '../context/SongsContext';
import Canciones from './Canciones.jsx';
import Footer from './Footer.jsx';

const Favorites = () => {
    const { adminSongs, songs, favorites } = useSongs();
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [isLoading, setIsLoading]         = useState(true);

    useEffect(() => {
        // Cruzamos los ids favoritos contra todas las canciones disponibles
        const allSongs = [...adminSongs, ...songs];
        const matched  = favorites
            .map(id => allSongs.find(s => s.codigo_unico === id))
            .filter(Boolean);
        setFavoriteSongs(matched);
        setIsLoading(false);
    }, [favorites, adminSongs, songs]);

    return (
        <div className="animate-fade-in p-4 md:p-8 w-full min-h-full bg-linear-to-b from-red-900/10 to-black">

            {/* Cabecera */}
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
                <span className="text-5xl">❤️</span>
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white">Mis Favoritos</h1>
                    <p className="text-gray-400 mt-1">
                        {favoriteSongs.length} {favoriteSongs.length === 1 ? 'canción guardada' : 'canciones guardadas'}
                    </p>
                </div>
            </div>

            {/* Contenido */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : favoriteSongs.length === 0 ? (
                <div className="text-center py-24 bg-neutral-900/40 rounded-2xl border border-dashed border-white/10">
                    <p className="text-5xl mb-4">🎵</p>
                    <p className="text-gray-400 text-xl font-medium">Todavía no tenés favoritos</p>
                    <p className="text-gray-600 text-sm mt-2">
                        Hacé clic en el ❤️ de cualquier canción para guardarla acá
                    </p>
                </div>
            ) : (
                <Canciones songs={favoriteSongs} />
            )}

            <Footer />
        </div>
    );
};

export default Favorites;