import React, { useState } from 'react';
import { useSongs } from '../context/SongsContext'; 
import Canciones from '../components/Canciones.jsx'; 
import CatalogoPorSecciones from '../components/CatalogoPorSecciones.jsx'; 
import Navbar from '../components/Navbar.jsx';
import Aside from '../components/Aside.jsx';
import Player from '../components/Player.jsx';
import Footer from '../components/Footer.jsx';
import Fondo from '../assets/imagenes/logos/FondoLogo.jpg';

const Home = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { 
        songs,           // Catálogo de la API / Resultados de Búsqueda
        isLoading,
        error,   
    } = useSongs();

    if (error) {
        return <div className="p-8 text-center text-red-500 bg-neutral-900 min-h-screen">Error: {error}</div>;
    }

    return (
        <div id="app" className="grid w-full h-screen bg-black text-white m-0 p-0 transition-all duration-300">
            <header className="[grid-area:navbar] flex-col flex"><Navbar toggleSidebar={() => setIsOpen(!isOpen)}/></header>
            <aside className={`flex-col flex overflow-y-auto ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 -translate-x-full'}`}><Aside /></aside>
            <main className="[grid-area:main] overflow-y-auto w-full">
                <div className="animate-fade-in p-4 md:p-6 w-full">
                    <h2 className="text-3xl font-bold text-violet-400 mb-6 border-b border-violet-700 pb-2">
                        Catálogo Musical
                    </h2>
                    {isLoading ? <p className="text-center py-10 animate-pulse">Cargando...</p> : <Canciones songs={songs} />}
                    <div className="mt-12 pt-6 border-t border-neutral-800">
                        <CatalogoPorSecciones />
                    </div>
                </div>
                <Footer/>
            </main>
            <footer className="[grid-area:player] w-full bg-linear-to-b from-purple-950/40"><Player/></footer>
        </div>
    );
};

export default Home;