import SearchBar from '../components/SearchBar';
import SongCard from './Canciones'; 

const Navbar = () => {

  return (
    <div className="home-page w-full h-full flex flex-col items-center">
      <SearchBar /> 
      </div>
  );
};

export default Navbar;