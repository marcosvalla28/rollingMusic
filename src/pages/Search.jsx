import React, { useState } from 'react';
import { useSongs } from '../context/SongsContext'; 
import Canciones from '../components/Canciones.jsx'; 
import CatalogoPorSecciones from '../components/CatalogoPorSecciones.jsx'; 
import Navbar from '../components/Navbar.jsx';
import Aside from '../components/Aside.jsx';
import Player from '../components/Player.jsx';
import Footer from '../components/Footer.jsx';

const GENRES = [
  { name: 'Contry', color: 'from-orange-600 to-amber-900' },
  { name: 'Rock', color: 'from-red-900 to-rose-700' },
  { name: 'Hip-Hop', color: 'from-indigo-900 to-purple-800' },
  { name: 'Pop', color: 'from-pink-700 to-rose-900' },
  { name: 'LAT!N', color: 'from-slate-500 to-purple-400' },
  { name: 'R&B', color: 'from-orange-900 to-red-700' },
  { name: 'Cristiana', color: 'from-teal-800 to-stone-500' },
  { name: 'Dance y Electrónica', color: 'from-purple-800 to-emerald-900' },
  { name: 'Niños', color: 'from-orange-600 to-amber-900' },
  { name: 'Clásica', color: 'from-red-900 to-rose-700' },
  { name: 'Jazz', color: 'from-indigo-900 to-purple-800' },
  { name: 'K-Pop', color: 'from-pink-700 to-rose-900' },
  { name: 'Tropical', color: 'from-slate-500 to-purple-400' },
  { name: 'Compositores y Productores', color: 'from-orange-900 to-red-700' },
  { name: 'Urbano', color: 'from-teal-800 to-stone-500' },
  { name: 'Rock Clásico', color: 'from-purple-800 to-emerald-900' },
];

const Search = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { 
        handleSearch,
        songs,           // Catálogo de la API / Resultados de Búsqueda
        isLoading,
        error,
        searchTerm,     
    } = useSongs();

    if (error) {
        return <div className="p-8 text-center text-red-500 bg-neutral-900 min-h-screen">Error: {error}</div>;
    }

    return (
        <div id="app" className="grid w-full h-screen bg-black text-white m-0 p-0 transition-all duration-300">
            <header className="[grid-area:navbar] flex-col flex"><Navbar toggleSidebar={() => setIsOpen(!isOpen)}/></header>
            <aside className={`flex-col flex overflow-y-auto ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 -translate-x-full'}`}><Aside /></aside>
            <main className="[grid-area:main] overflow-y-auto w-full">
                <div className='animate-fade-in px-4 md:px-6 py-4 grow w-full'>
                    <h2 className="text-3xl font-bold text-violet-400 mb-6 border-b border-violet-700 pb-2">Música por género</h2>
                </div>
                
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 px-4 md:px-6 grow w-full">

            {GENRES.map((genre) => (

                <button
                key={genre.name}
                onClick={() => handleSearch(genre.name)} // Al hacer clic, busca el género
                className={`h-24 rounded-lg bg-linear-to-br ${genre.color}
                            flex items-center justify-center p-4 text-center
                            hover:scale-105 transition-transform duration-200 shadow-lg`}
                >

                    <span className="text-white font-bold text-lg drop-shadow-md">
                        {genre.name}
                    </span>
                </button>
            ))}
        </div>
                <div key={searchTerm} className="animate-fade-in px-4 md:px-6 py-8 grow w-full">
                    <h2 className="text-3xl font-bold text-violet-400 mb-6 border-b border-violet-700 pb-2">
                        {searchTerm ? `Resultados para "${searchTerm}"` : "Explorar música"}
                    </h2>
                    
                    {isLoading && <p className="text-center py-10 animate-pulse">Buscando...</p>}
                    
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