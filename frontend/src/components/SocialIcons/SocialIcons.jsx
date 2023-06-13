import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const SocialIcons = () => {
  return (
    <div className='social-icons'>
      <Link to='/'>
        <FontAwesomeIcon icon={faFacebookF} />
      </Link>
      <Link href='/'>
        <FontAwesomeIcon icon={faTwitter} />
      </Link>
      <Link href='/'>
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
    </div>
  );
};

export default SocialIcons;
