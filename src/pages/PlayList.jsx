import React from 'react'
import { useSongs } from '../context/SongsContext'; 
import Canciones from '../components/Canciones.jsx';
import CatalogoPorSecciones from '../components/CatalogoPorSecciones.jsx'; 
import Navbar from '../components/Navbar.jsx';
import Aside from '../components/Aside.jsx';
import Player from '../components/Player.jsx';

function PlayList() {
  const { 
          songs,           // Catálogo de la API / Resultados de Búsqueda
          adminSongs,      // Lista de Reproducción Personal (el CRUD)
          isLoading, 
          error, 
          searchTerm,      
      } = useSongs();
  
      if (error) {
          return <div className="p-8 text-center text-red-500 bg-neutral-900 min-h-screen">Error: {error}</div>;
      }
  return (
    <div id="app" className="grid w-full h-screen bg-black m-0 p-0">
      <header className="[grid-area:navbar] flex-col flex overflow-y-auto">
                <Navbar/>
            </header>
            
            <aside className=" flex-col flex overflow-y-auto ">
                <Aside />
            </aside>
            <main className="[grid-area:main] bg-black">
              <div className="p-4 md:p-8 grow">

                {/* 📝 3. SECCIÓN ADICIONAL: LISTA DE REPRODUCCIÓN (CRUD) */}
                        <h2 className="text-3xl font-bold text-violet-400 mt-12 mb-6 border-b border-violet-700 pb-2">
                            Lista de Reproducción
                        </h2>
                        
                        {adminSongs.length === 0 ? (
                            <div className="text-center py-10 text-gray-400 bg-neutral-900 p-6 rounded-lg">
                                <p className="mb-2">Tu Lista de Reproducción está vacía.</p>
                                <p>Agrega canciones desde la sección de Administración.</p>
                            </div>
                        ) : (
                            <Canciones songs={adminSongs} />
                        )}

              </div>

              

            </main>
            <footer className="[grid-area:player] bg-linear-to-b from-purple-950/40">
                            <Player/> {/* El reproductor en su área Grid */}
                        </footer>

        
    </div>
  )
}

export default PlayList