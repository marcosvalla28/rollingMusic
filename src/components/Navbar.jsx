import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Logo from '../assets/imagenes/logos/Logo.png';
import Aside from '../components/Aside';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Imagen por defecto cuando no hay usuario
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/10813/10813372.png';
  const userAvatar = user?.photoURL || user?.avatar || defaultAvatar;
  const userName = user?.displayName || user?.name || 'Usuario';

  return (
    <>
      <div className="bg-gradient-to-r from-[#120228] to-[#4b0082] flex flex-row w-full h-full items-center justify-between px-4 z-10 relative">

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

          <Link to="/Home">
            <img
              src={Logo}
              alt="logo"
              className="w-[65px] cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        <div className="flex order-3 sm:order-0">
          <SearchBar />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-[50px] h-[50px] rounded-full bg-cover bg-center bg-no-repeat hover:shadow-[0_0_10px_#ffffff] transition-shadow border-2 border-purple-500"
            style={{ backgroundImage: `url(${userAvatar})` }}
            aria-label={userName}
            title={userName}
          >
          </button>

          {user && isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-purple-950 to-black rounded-lg shadow-xl border border-purple-500/30 z-50">
              <div className="p-4 border-b border-purple-500/30">
                <p className="text-white font-semibold truncate">{userName}</p>
                <p className="text-gray-400 text-sm truncate">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-white hover:bg-purple-900/30 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        {/* Overlay y Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="bg-gradient-to-b from-purple-950 to-black w-64 h-full p-4 shadow-2xl"
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
      </div>
    </>
  );
};

export default Navbar;