import logo from '../assets/imagenes/logos/Logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import { useState } from 'react';



function Footer() {

  const [openModal, setOpenModal] = useState(false);
  const [terminosModal, setTerminosModal] = useState(false);
  const [openSoporte, setOpenSoporte] = useState(false);


  return (

    <div className='w-full z-10'>


      <div className="border-t border-solid border-t-fuchsia-400 w-full flex flex-col justify-around bg-fuchsia-950 bg-linear-to-r md:flex-row">
        <div className='max-w-1/2 h-16 my-2 overflow-hidden self-center'>
          <img 
          src={logo} 
          alt="logo"
          className='h-full object-contain hover:scale-105'
          />
        </div>

        <div className='flex flex-row gap-2 align-center justify-center self-center'>
          <a href="https://www.linkedin.com/school/rollingcodeschool/posts/?feedView=all" ><FontAwesomeIcon icon={faLinkedin} size='2x' className='text-violet-400 hover:text-blue-600 hover:scale-125 drop-shadow-xl/50'/></a>
          <a href="https://web.rollingcodeschool.com/"><FontAwesomeIcon icon={faGithub} size='2x' className='text-violet-400 hover:text-black hover:scale-125 drop-shadow-xl/50'/></a>
          <a href="https://www.facebook.com/RollingCodeSchool?locale=es_LA"><FontAwesomeIcon icon={faFacebook} size='2x' className='text-violet-400 hover:text-blue-500 hover:scale-125 drop-shadow-xl/50'/></a>
          <a href="https://www.instagram.com/rollingcodeschool/"><FontAwesomeIcon icon={faInstagram} size='2x' className='text-violet-400 hover:text-purple-500 hover:scale-125 drop-shadow-xl/50'/></a>
        </div>

        <div className='flex flex-col mt-4 md:mt-0'>
          <h2 className="text-lg font-semibold mb-2 text-center text-violet-400">Avisos Legal</h2>
          <button 
            onClick={() => setOpenModal(true)}
            className="text-sm  hover:text-violet-400 transition cursor-pointer"
          >
            Políticas de Privacidad
          </button>

          <button 
            onClick={() => setTerminosModal(true)}
            className="text-sm text-center  hover:text-violet-400 transition cursor-pointer">
            Términos y Condiciones
          </button>
          <button 
            onClick={() => setOpenSoporte(true)}
            className="text-sm text-center hover:text-violet-400 transition cursor-pointer">
            Soporte
          </button>
        </div>
      </div>


      <div className='text-center bg-fuchsia-900 bg-linear-to-bl'>
        <p className=''>
          © 2025 Copyright:
          <a
            className="fw-bolder text-dark"
            href="https://rollingcode.co/"
            target="_blank"
            > RollingCode </a>
        </p>
      </div>




{/* ESTE MODAL ES PARA LAS POLITICAS DE PRIVACIDAD */}
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
          </div>
        </div>
      )}


{/* ESTE MODAL ES PARA LOS TERMINOS Y CONDICIONES */}

      {terminosModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-violet-300 text-black rounded-2xl p-6 max-w-lg w-11/12 relative animate-fadeIn">
            <button 
              onClick={() => setTerminosModal(false)} 
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Terminos y Condiciones</h2>
            <p className="text-sm leading-relaxed overflow-y-auto max-h-96">
              Bienvenido/a a [nombre de tu sitio o app]. Al acceder o utilizar este sitio web, aceptás cumplir con los siguientes términos y condiciones. Te pedimos que los leas atentamente antes de continuar.

                1. Uso del sitio

                El contenido de este sitio es únicamente para uso personal y no comercial. No está permitido copiar, distribuir, modificar o reutilizar ningún contenido sin autorización previa.

                2. Propiedad intelectual

                Todos los derechos sobre textos, imágenes, logotipos, íconos, diseños, código fuente y demás materiales pertenecen a [nombre de tu empresa o grupo] o a sus respectivos autores. Queda prohibido su uso no autorizado.

                3. Privacidad

                Nos comprometemos a proteger tu información personal. Podés consultar nuestra Política de Privacidad para conocer cómo recopilamos, usamos y protegemos tus datos.

                4. Responsabilidad

                No nos hacemos responsables por daños, pérdidas o perjuicios derivados del uso del sitio o de la imposibilidad de acceder al mismo. El uso del sitio corre por tu cuenta y riesgo.

                5. Modificaciones

                Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento sin previo aviso. Te recomendamos revisar esta sección periódicamente.

                6. Aceptación

                Al hacer clic en “Aceptar” o continuar utilizando el sitio, confirmás que leíste y aceptás los presentes Términos y Condiciones.
            </p>
          </div>
        </div>
      )}

{/* ESTE MODAL ES PARA EL SOPORTE */}

      {openSoporte && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-violet-300 text-black rounded-2xl p-6 max-w-lg w-11/12 relative animate-fadeIn">
            <button 
              onClick={() => setOpenSoporte(false)} 
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Soporte</h2>
            <p className="text-sm leading-relaxed">
              ¿Tenés algún problema o duda? Estamos acá para ayudarte.
              Podés comunicarte con nuestro equipo de soporte si necesitás asistencia técnica, información sobre tu cuenta o cualquier consulta relacionada con el sitio.

              📧 Contacto

              Correo electrónico: soporteRollingplay@Gmail.com

              Horario de atención: Lunes a Viernes, de 9:00 a 18:00 (GMT-3)

              Tiempo estimado de respuesta: entre 24 y 48 horas hábiles.

              🔧 Antes de contactar

              Te recomendamos revisar la sección de Preguntas Frecuentes (FAQ), donde respondemos a las dudas más comunes sobre el uso de la plataforma, registro, recuperación de cuenta y otros temas.

              🤝 Compromiso

              Nuestro objetivo es brindarte una atención rápida, clara y eficiente.
              Si ya nos escribiste, por favor no envíes múltiples mensajes sobre el mismo tema: esto nos ayuda a responderte más rápido.

              Gracias por confiar en RollingPlay 💙
            </p>
          </div>
        </div>
      )}


    </div>
  );
}


export default Footer;
