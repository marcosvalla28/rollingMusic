import logo from '../assets/imagenes/Img-miembros/logo-Rolling-Play.png';
import EfectoLluvia from '../components/EfectoLluvia';

function About() {
  return (
    <div>

      <EfectoLluvia/>


      <h1 className="text-center">SOBRE NOSOTROS</h1>
      
      <div className="border-2 border-violet-400 rounded-xl m-30 p-6 min-h-100 bg-violet-300 
                      flex flex-col md:flex-row items-center justify-center gap-30 z-10">
      <div className="w-70 h-70 bg-blue-500 rounded-full mb-4 justify-items-center shrink-0 z-10"></div>
      <p className="text-gray-700 text-justify max-w-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptatum distinctio tenetur aliquam, atque id quibusdam eos laboriosam corporis consequatur, pariatur asperiores, rerum doloremque nam! Facilis amet reiciendis nemo delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. In adipisci quia nobis corrupti similique corporis nihil, optio et odit unde. Libero mollitia quae temporibus voluptatem nihil! Dolorem architecto ipsam ipsum.</p>
      </div>

      <div className='flex justify-center flex-wrap gap-10 mt-10 mb-10'>
        <img src={logo} alt="Miembro-1" className='w-50 h-100' />
        <img src={logo} alt="Miembro-1" className='w-50 h-100' />
        <img src={logo} alt="Miembro-1" className='w-50 h-100' />
        <img src={logo} alt="Miembro-1" className='w-50 h-100' />
        <img src={logo} alt="Miembro-1" className='w-50 h-100' />
        <img src={logo} alt="Miembro-1" className='w-50 h-100' />
      </div>
    </div>
  )
}

export default About
