import { useNavigate } from "react-router-dom";
import logo from '../assets/imagenes/logos/Logo.png';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-r from-[#0d001a] via-[#1a0033] to-[#0d001a]
      px-6 text-white space-y-10">

      {/* Logo */}
      <img
        src={logo}
        alt="RollingMusic logo"
        className="h-24 object-contain hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
      />

      {/* 404 */}
      <h1
        className="text-8xl md:text-9xl font-extrabold
        text-transparent bg-clip-text
        bg-gradient-to-r from-purple-400 to-violet-300
        drop-shadow-lg"
      >
        404
      </h1>

      {/* Mensaje */}
      <p className="text-xl md:text-2xl text-purple-400 text-center max-w-md">
        Se nos cayó la página… pero no las ganas de programar.
      </p>


      {/* Texto adicional */}
      <p className="text-gray-300 text-center max-w-lg">
        La página que estás buscando no existe o fue movida.  
        Revisá la dirección o volvé al inicio.
      </p>

      {/* Botón volver */}
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-6 py-3 rounded-2xl font-semibold
        bg-gradient-to-r from-purple-950 to-neutral-900
        text-white shadow-md
        transition-transform duration-200 hover:scale-105"
      >
        Volver al inicio
      </button>
    </div>
  );
}

export default NotFound;
