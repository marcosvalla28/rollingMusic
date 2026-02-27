import { useState } from 'react';
import Navbar from '../components/Navbar';
import Aside from '../components/Aside';
import Player from '../components/Player';
import FloatingLines from '../components/FloatingLines';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const asideWidth = isOpen ? 256 : 0;
    const navbarHeight = 80;
    const playerHeight = 160;

    return (
        <div
            id="app"
            className="w-full h-screen bg-black text-white m-0 p-0 overflow-hidden"
            style={{
                display: 'grid',
                gridTemplateAreas: '"navbar navbar" "aside main" "player player"',
                gridTemplateColumns: `${isOpen ? '256px' : '0px'} 1fr`,
                gridTemplateRows: 'auto 1fr auto',
                transition: 'grid-template-columns 0.3s',
            }}
        >
            <header
                className="[grid-area:navbar] flex-col flex h-20"
                style={{ zIndex: 30, position: 'relative' }}
            >
                <Navbar toggleSidebar={() => setIsOpen(prev => !prev)} />
            </header>

            <aside
                className="[grid-area:aside] flex flex-col overflow-y-auto overflow-x-hidden transition-all duration-300"
                style={{ zIndex: 20, position: 'relative', width: isOpen ? '256px' : '0px' }}
            >
                {isOpen && <Aside />}
            </aside>

            <main
                className="[grid-area:main] overflow-y-auto overflow-x-hidden w-full"
                style={{ zIndex: 1, position: 'relative', height: '100%' }}
            >
                {/* FloatingLines: fixed exactamente sobre el área del main */}
                <div style={{
                    position: 'fixed',
                    top: navbarHeight,
                    left: asideWidth,
                    right: 0,
                    bottom: playerHeight,
                    zIndex: 0,
                    pointerEvents: 'none',
                    transition: 'left 0.3s',
                }}>
                    {/* div relative necesario para que .floating-lines-container (absolute) funcione */}
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <FloatingLines
                            enabledWaves={['top', 'middle', 'bottom']}
                            lineCount={[4, 6, 4]}
                            lineDistance={[5, 4, 5]}
                            bendRadius={4}
                            bendStrength={-0.4}
                            interactive={true}
                            parallax={true}
                            animationSpeed={0.5}
                            linesGradient={['#4c1d95', '#7c3aed', '#a855f7', '#d946ef']}
                            mixBlendMode="screen"
                        />
                    </div>
                </div>

                {/* Contenido encima de las líneas */}
                <div style={{ position: 'relative', zIndex: 1, minHeight: '100%' }}>
                    <Outlet />
                </div>
            </main>

            <footer
                className="[grid-area:player] w-full h-40 relative overflow-visible"
                style={{ zIndex: 20 }}
            >
                <Player />
            </footer>
        </div>
    );
};

export default MainLayout;