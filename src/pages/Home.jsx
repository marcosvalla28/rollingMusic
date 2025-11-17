import React from 'react';
import { useSongs } from '../context/SongsContext'; 
import Canciones from '../components/Canciones.jsx'; 
import CatalogoPorSecciones from '../components/CatalogoPorSecciones.jsx'; 
import Navbar from '../components/Navbar.jsx';
import Aside from '../components/Aside.jsx';
import Player from '../components/Player.jsx';
import Footer from '../components/Footer.jsx';
import Fondo from '../assets/imagenes/logos/FondoLogo.jpg';

const Home = () => {
    const { 
        songs,           // Catálogo de la API / Resultados de Búsqueda
        adminSongs,      // Lista de Reproducción Personal (el CRUD)
        isLoading,
        error,
        searchTerm,     
    } = useSongs();

    if (error) {
        return <div className="p-8 text-center text-red-500 bg-neutral-900 min-h-screen">Error: {error}</div>;
    }

    return (
    <>
    <div id="app"   className="grid w-full h-screen bg-black text-white m-0 p-0">
        {/* CORRECCIÓN: Eliminamos overflow-y-auto, ya que el Navbar no debe hacer scroll */}
        <header className="[grid-area:navbar] flex-col flex"> 
            <Navbar/>
        </header>
        
        <aside className=" flex-col flex overflow-y-auto ">
            <Aside />
        </aside>

        <main className="[grid-area:main] overflow-y-auto p-4 md:p-8">
        <div className="flex flex-col min-h-screen text-white" >
        {/* El padding lateral (p-4 md:p-8) aplica espaciado a todos los elementos del contenido */}
        <div className="p-4 md:p-8 grow">
            
            {/* 🎶 1. SECCIÓN PRINCIPAL: CATÁLOGO / RESULTADOS DE BÚSQUEDA */}
            <h2 className="text-3xl font-bold text-violet-400 mb-6 border-b border-violet-700 pb-2">
                {searchTerm ? `Resultados para "${searchTerm}"` : "Catálogo Musical"}
            </h2>
            
            {isLoading && <p className="text-center py-10">Cargando catálogo...</p>}
            
            {!isLoading && songs.length === 0 && searchTerm && (
                <p className="text-center py-10 text-gray-400">No se encontraron resultados para tu búsqueda.</p>
            )}
            
            {!isLoading && songs.length > 0 && (
                <Canciones songs={songs} />
            )}
            
            {/* 🌟 2. SECCIONES TEMÁTICAS (Solo se muestran si NO hay búsqueda activa) */}
            {!searchTerm && (
                <div className="mt-12 pt-6 border-t border-neutral-800">
                    <CatalogoPorSecciones />
                </div>
            )}

            
            

        </div>
        </div>
                    <Footer/>
        </main>
        <footer className="[grid-area:player] w-full h-full bg-linear-to-b from-purple-950/40">
            <Player/> {/* El reproductor en su área Grid */}
        </footer>
    </div>
    </>
    );
};

export default Home;