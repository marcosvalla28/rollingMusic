import logo from '../assets/imagenes/logos/logo-play.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from 'react';



function Footer() {

  const [openModal, setOpenModal] = useState(false);


  return (
    <div className="border-t border-solid w-full flex flex-row justify-around">
      <img 
      src={logo} 
      alt="logo"
      className='max-w-1/2 h-16 my-2'
      />

      <div className='flex flex-row gap-2'>
        <FontAwesomeIcon icon={faLinkedin} size='2x'/>
        <FontAwesomeIcon icon={faGithub} size='2x'/>
        <FontAwesomeIcon icon={faFacebook} size='2x'/>
        <FontAwesomeIcon icon={faInstagram} size='2x'/>
      </div>

      <div className='flex flex-col mt-4 md:mt-0'>
        <h2 className="text-lg font-semibold mb-2">Legal</h2>
        <button 
          onClick={() => setOpenModal(true)}
          className="text-sm  hover:text-violet-400 transition"
        >
          Políticas de Privacidad
        </button>
        <a href="#" className="text-sm  hover:text-violet-400 transition">
          Términos y Condiciones
        </a>
        <a href="#" className="text-sm  hover:text-violet-400 transition">
          Soporte
        </a>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-violet-300 text-black rounded-2xl p-6 max-w-lg w-11/12 relative animate-fadeIn">
            <button 
              onClick={() => setOpenModal(false)} 
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Políticas de Privacidad</h2>
            <p className="text-sm leading-relaxed">
              En Rolling Play nos comprometemos a proteger tu privacidad. La información que recopilamos
              se utiliza únicamente para mejorar tu experiencia en nuestra plataforma.
              No compartimos tus datos personales con terceros sin tu consentimiento.
            </p>

            <p className="text-sm mt-3 leading-relaxed">
              Al utilizar nuestro sitio, aceptás nuestras políticas de privacidad y el tratamiento
              de la información según las leyes vigentes.
            </p>

            <button className='border border-fuchsia-800 rounded-full '>Acepto</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Footer
