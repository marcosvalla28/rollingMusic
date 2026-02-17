import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Logo from '../assets/imagenes/logos/Logo.png';
import Aside from '../components/Aside';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMenuClick = () => {
    toggleSidebar();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Imagen por defecto cuando no hay usuario
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/10813/10813372.png';
  const userAvatar = user?.photoURL || user?.avatar || defaultAvatar;
  const userName = user?.displayName || user?.name || 'Usuario';

  return (
 <>
      <header className="bg-linear-to-r from-[#120228] to-[#4b0082]
                         flex items-center justify-between
                         w-full h-full px-3 sm:px-4 md:px-6
                         z-10 relative">

        {/* Izquierda: hamburguesa + logo */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={handleMenuClick}
            className="text-white hover:bg-purple-900/30 rounded-lg p-2 transition-colors"
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link to="/Home">
            <img
              src={Logo}
              alt="RollingMusic logo"
              className="w-12 sm:w-[65px] cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Centro: SearchBar — se encoge en móvil */}
        <div className="flex-1 flex justify-center px-2 sm:px-4 min-w-0">
          <SearchBar />
        </div>

        {/* Derecha: avatar + menú usuario */}
        <div className="relative shrink-0">
          <button
            onClick={() => setIsUserMenuOpen(prev => !prev)}
            className="w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full bg-cover bg-center bg-no-repeat
                       hover:shadow-[0_0_10px_#ffffff] transition-shadow border-2 border-purple-500"
            style={{ backgroundImage: `url(${userAvatar})` }}
            aria-label={userName}
            title={userName}
          />

          {user && isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 sm:w-48
                            bg-linear-to-b from-purple-950 to-black
                            rounded-lg shadow-xl border border-purple-500/30 z-50">
              <div className="p-3 sm:p-4 border-b border-purple-500/30">
                <p className="text-white font-semibold truncate text-sm">{userName}</p>
                <p className="text-gray-400 text-xs truncate">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-white text-sm hover:bg-purple-900/30 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Drawer móvil */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-linear-to-b from-purple-950 to-black w-64 h-full p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white mb-6 ml-auto block hover:bg-purple-900/30 p-2 rounded-lg"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Aside onItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;