import React, { useState } from 'react';
import { useSongs } from '../context/SongsContext'; 
import Canciones from '../components/Canciones.jsx'; 
import CatalogoPorSecciones from '../components/CatalogoPorSecciones.jsx'; 
import Navbar from '../components/Navbar.jsx';
import Aside from '../components/Aside.jsx';
import Player from '../components/Player.jsx';
import Footer from '../components/Footer.jsx';
import FloatingLines from '../components/FloatingLines.jsx';

const Home = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { songs, isLoading, error } = useSongs();

    if (error) {
        return <div className="p-8 text-center text-red-500 bg-neutral-900 min-h-screen">Error: {error}</div>;
    }

    const asideWidth = isOpen ? 256 : 0;

    return (
        <div id="app" className="grid w-full h-screen bg-black text-white m-0 p-0 transition-all duration-300">

            <header className="[grid-area:navbar] flex-col flex" style={{ zIndex: 30, position: 'relative' }}>
                <Navbar toggleSidebar={() => setIsOpen(!isOpen)}/>
            </header>

            <aside
                className={`[grid-area:aside] flex-col flex overflow-y-auto transition-all duration-300
                    ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
                style={{ zIndex: 20, position: 'relative' }}
            >
                <Aside />
            </aside>

            <main className="[grid-area:main] overflow-y-scroll overflow-x-hidden w-full relative bg-black">
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
                </div>
                <div className="relative z-10">
                    <Footer />
                </div>
            </main>

            {/* Ondas: right: 6px deja libre el scrollbar del main */}
            <div
                style={{
                    position: 'fixed',
                    top: '80px',
                    left: `${asideWidth}px`,
                    right: '6px',          /* ← espacio para el scrollbar */
                    bottom: '160px',
                    zIndex: 1,
                    transition: 'left 0.3s',
                    pointerEvents: 'none',
                }}
            >
                <FloatingLines
                    enabledWaves={["top", "middle", "bottom"]}
                    lineCount={[4, 6, 4]}
                    lineDistance={[5, 4, 5]}
                    bendRadius={4}
                    bendStrength={-0.4}
                    interactive={true}
                    parallax={true}
                    animationSpeed={0.5}
                    linesGradient={["#4c1d95", "#7c3aed", "#a855f7", "#d946ef"]}
                    mixBlendMode="screen"
                />
            </div>

            <footer className="[grid-area:player] w-full h-40 relative overflow-hidden" style={{ zIndex: 20 }}>
                <Player/>
            </footer>

        </div>
    );
};

export default Home;