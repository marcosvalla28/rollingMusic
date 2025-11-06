import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Logo from '../assets/imagenes/logos/Logo.png';
import Aside from '../components/Aside';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-linear-to-r from-[#120228] to-[#4b0082] flex flex-row w-full h-full items-center justify-around">
        
        <div className="flex items-center gap-4">
          {/* botón hamburguesa para el modo mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:bg-purple-900/30 rounded-lg p-2"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <img className="w-[100px]" src={Logo} alt="logo"/>
        </div>

        <div className="flex order-3 sm:order-0">
          <SearchBar /> 
        </div>

        <div>
          <button 
            className="w-[50px] h-[50px] rounded-full bg-cover bg-no-repeat hover:shadow-[0_0_10px_#ffffff] transition-shadow"
            style={{backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/10813/10813372.png)'}}
            aria-label="Usuario"
          >
          </button>
        </div>
        
      </div>

      {/* Overlay y Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="bg-linear-to-b from-purple-950 to-black w-64 h-full p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* botón para cerrar dentro del menu X */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white mb-6 ml-auto block hover:bg-purple-900/30 p-2 rounded-lg"
              aria-label="Cerrar menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* aside en mobile */}
            <Aside onItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;