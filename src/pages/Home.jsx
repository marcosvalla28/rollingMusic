import { useSongs } from '../context/SongsContext';
import Canciones from '../components/Canciones.jsx';
import CatalogoPorSecciones from '../components/CatalogoPorSecciones.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
    const { songs, isLoading, error } = useSongs();

    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="relative z-10 animate-fade-in p-4 md:p-6 w-full">
            <h2 className="text-3xl font-bold text-violet-400 mb-6 border-b border-violet-700 pb-2">
                Catálogo Musical
            </h2>
            {isLoading
                ? <p className="text-center py-10 animate-pulse">Cargando...</p>
                : <Canciones songs={songs} />
            }
            <div className="mt-12 pt-6 border-t border-neutral-800">
                <CatalogoPorSecciones />
            </div>
            <Footer />
        </div>
    );
};

export default Home;