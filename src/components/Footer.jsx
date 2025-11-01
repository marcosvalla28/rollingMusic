import logo from '../assets/imagenes/logos/logo-play.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";



function Footer() {
  return (
    <div className="border-t border-solid w-full flex flex-row justify-around">
      <img 
      src={logo} 
      alt="logo"
      className='max-w-1/2'
      />

      <div className='flex flex-row gap-2'>
        <FontAwesomeIcon icon={faLinkedin} size='2x'/>
        <FontAwesomeIcon icon={faGithub} size='2x'/>
        <FontAwesomeIcon icon={faFacebook} size='2x'/>
        <FontAwesomeIcon icon={faInstagram} size='2x'/>
      </div>

    </div>
  )
}

export default Footer
