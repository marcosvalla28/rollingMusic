import SearchBar from '../components/SearchBar';
import Logo from '../assets/imagenes/logos/Logo.png';
import SongCard from '../components/SongCard'; 

const Navbar = () => {

  return (
    <div className="home-page w-full h-full flex flex-col items-center">
      <SearchBar /> 
      <div>
        Logo
      </div>

      <div></div>
      

    </div>
  );
};

export default Navbar;