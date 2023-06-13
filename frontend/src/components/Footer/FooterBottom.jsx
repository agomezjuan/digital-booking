import { Link } from 'react-router-dom';
import SocialIcons from '../SocialIcons/SocialIcons';

const FooterBottom = () => {
  return (
    <div className='footer-bottom'>
      <div
        className='container'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p className='copyright' style={{ textAlign: 'center' }}>
          &copy; 2023 <Link to='/'>Digital Booking</Link>.
        </p>
        <SocialIcons />
        {/* <ul className='footer-bottom-list'>
          <li>
            <a href='#' className='footer-bottom-link'>
              Política de Privacidad
            </a>
          </li>

          <li>
            <a href='#' className='footer-bottom-link'>
              Términos y condiciones
            </a>
          </li>

          <li>
            <a href='#' className='footer-bottom-link'>
              FAQ
            </a>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default FooterBottom;
