import logo from '../assets/imagenes/Img-miembros/logo-Rolling-Play.png';
import marcos from '../assets/imagenes/Img-miembros/marcos.png'
import EfectoLluvia from '../components/EfectoLluvia';
import play from '../assets/imagenes/logos/logo-play.png';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


function About() {

  const [miembroSeleccionado, setMiembroSeleccionado] = React.useState({
    id: 0,
    nombre: 'Rolling Play',
    img: play,
    description: 'Somos un grupo de desarrolladores comprometido con la creacion de experiencias digitales innovadoras y de alta calidad.',
  });

  const miembros = [
    {id: 1,
    nombre: 'Marcos Valladares',
    img: marcos,
    description: 'Scrum Master y Desarrollador FrontEnd, Con muchas ganas de aprender y crecer en el mundo del desarrollo web.',
    linkedin: 'https://www.linkedin.com/in/marcos-adrian-valladares-65a043286/',
    github:'https://github.com/marcosvalla28'
    },
    {
      id: 2,
      nombre: 'Juan Garcia',
      img: logo,
      description: '',
      linkedin: 'https://www.linkedin.com/in/marcos-adrian-valladares-65a043286/',
      github:'https://github.com/marcosvalla28'
    },
    {
      id: 3,
      nombre: 'Franco Quinteros',
      img: logo,
      description: '',
      linkedin: 'https://www.linkedin.com/in/franco-quinteros-dev/',
      github:'https://github.com/FrancoDevBJ'
    },
    {
      id: 4,
      nombre: 'Eliana Ocampo',
      img: logo,
      description: '',
      linkedin: 'https://www.linkedin.com/in/marcos-adrian-valladares-65a043286/',
      github:'https://github.com/marcosvalla28'
    },
    {
      id: 5,
      nombre: 'Luis Santiago Sandoval',
      img: logo,
      description: '',
      linkedin: 'https://www.linkedin.com/in/marcos-adrian-valladares-65a043286/',
      github:'https://github.com/marcosvalla28'
    },
    {
      id: 6,
      nombre: 'Lucas Teseira',
      img: logo,
      description: '',
      linkedin: 'https://www.linkedin.com/in/marcos-adrian-valladares-65a043286/',
      github:'https://github.com/marcosvalla28'
    }
  ]



  return (
    <div>

      <EfectoLluvia/>


      <h1 className="text-center">SOBRE NOSOTROS</h1>
      
      <div className="border-2 border-violet-400 rounded-xl m-30 p-6 min-h-100 bg-violet-300 flex flex-col md:flex-row items-center justify-center gap-10 z-10">

      <div className="w-[400px] justify-items-center content-center shrink-0 z-10 overflow-hidden">
        <img 
        src={miembroSeleccionado.img} 
        alt={miembroSeleccionado.nombre}
        className="object-cover rounded-full drop-shadow-2xl w-64 sm:w-80 lg:w-[400px]"
        />
      </div>
      <div>
      
      <h2 className='text-5xl mb-8 font-mono text-center drop-shadow-black-9xl shrink-0 z-10'>{miembroSeleccionado.nombre}</h2>
      
      <p className="text-gray-700 text-justify max-w-lg shrink-0 z-10 text-xl mt-8">{miembroSeleccionado.description}</p>

      <div className='justify-self-center'>
      {miembroSeleccionado.id !== 0 &&(
        <button 
        onClick={() => window.open(miembroSeleccionado.linkedin, '_blank', 'noopener,noreferrer')}
        className='px-2 py-2 mt-7 bg-violet-700 text-white font-semibold rounded-lg shadow-md  hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 z-999'
        ><FontAwesomeIcon icon={faLinkedin} size='2x'/></button>
      )}
      {miembroSeleccionado.id !== 0 &&(
        <button 
        onClick={() => window.open(miembroSeleccionado.github, '_blank', 'noopener,noreferrer')}
        className='px-2 py-2 mt-7 mx-7 bg-violet-700 text-white font-semibold rounded-lg shadow-md  hover:bg-black hover:scale-105 active:scale-95 transition-all duration-300 z-999'><FontAwesomeIcon icon={faGithub} size='2x'/></button>
      )}
      </div>

      </div>
      </div>

      <div className='flex justify-center flex-wrap mt-10 mb-10 shrink-0 z-10'>
        {miembros.map((m) =>(
          <img
        key={m.id}
        src={m.img} 
        alt={m.nombre}
        onClick={() => setMiembroSeleccionado(m)}
        className='w-100 h-60 cursor-pointer opacity-80 hover:scale-150 transition-transform duration-300 hover:opacity-100 hover:z-999'
        />
        ))}
      </div>
    </div>
  )
}

export default About
