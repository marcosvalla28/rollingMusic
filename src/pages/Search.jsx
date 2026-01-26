import { useSongs } from '../context/SongsContext'; 
import Canciones from '../components/Canciones.jsx'; 
import CatalogoPorSecciones from '../components/CatalogoPorSecciones.jsx'; 
import Navbar from '../components/Navbar.jsx';
import Aside from '../components/Aside.jsx';
import Player from '../components/Player.jsx';
import Footer from '../components/Footer.jsx';

const Search = () => {
    const { 
        songs,           // Catálogo de la API / Resultados de Búsqueda
        isLoading,
        error,
        searchTerm,     
    } = useSongs();

    if (error) {
        return <div className="p-8 text-center text-red-500 bg-neutral-900 min-h-screen">Error: {error}</div>;
    }

    return (
        <div id="app" className="grid w-full h-screen bg-black text-white m-0 p-0">
            <header className="[grid-area:navbar] flex-col flex"><Navbar/></header>
            <aside className="flex-col flex overflow-y-auto"><Aside /></aside>
            <main className="[grid-area:main] overflow-y-auto p-4 md:p-8">
                <div key={searchTerm} className="animate-fade-in p-4 md:p-8 grow">
                    <h2 className="text-3xl font-bold text-violet-400 mb-6 border-b border-violet-700 pb-2">
                        {searchTerm ? `Resultados para "${searchTerm}"` : "Explorar música"}
                    </h2>
                    
                    {isLoading && <p className="text-center py-10 animate-pulse"></p>}
                    
                    {!isLoading && songs.length === 0 && searchTerm && (
                        <p className="text-center py-10 text-gray-400">No encontramos nada para "{searchTerm}"</p>
                    )}
                    
                    {!isLoading && songs.length > 0 && <Canciones songs={songs} />}
                </div>
                <Footer/>
            </main>
            <footer className="[grid-area:player] w-full bg-linear-to-b from-purple-950/40"><Player/></footer>
        </div>
    );
}

export default Search;