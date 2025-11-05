import SearchBar from '../components/SearchBar';
import Logo from '../assets/imagenes/logos/Logo.png';
import SongCard from '../components/SongCard'; 
import './Navbar.css'

const Navbar = () => {

  return (
    <div className="navbar">

      <div>
        <img className="logo" src={Logo} alt="logo"/>
      </div>

      <div className='middle'>
        <SearchBar /> 
      </div>

      <div className='btn-usuario'>
        <button className='usuario'>
          
        </button>
      </div>
      
    </div>
  );
};

export default Navbar;