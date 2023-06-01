import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import './Register.css';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      setIsRegistered(true);
    }, 3000);
  };

  return (
    <div className='register-body'>
      <div className='wrapper'>
        <form
          className={`register ${isRegistered ? 'ok' : ''}`}
          onSubmit={handleFormSubmit}
        >
          <p className='register-title'>Registro</p>
          <div className='register-input-wrapper'>
            <input type='text' placeholder='Nombre' autoFocus />
            <i className='fa fa-user'></i>
          </div>
          <div className='register-input-wrapper'>
            <input type='text' placeholder='Apellido' />
            <i className='fa fa-user'></i>
          </div>
          <div className='register-input-wrapper'>
            <input type='email' placeholder='Correo electrónico' />
            <i className='fa fa-envelope'></i>
          </div>
          <div className='register-input-wrapper'>
            <input type='password' placeholder='Contraseña' />
            <i className='fa fa-key'></i>
          </div>
          <button type='submit' className='register-button'>
            Registrarse
          </button>
        </form>
        <footer className='register-footer'>
          <div className='register-social-icons'>
            <a href='#'>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href='#'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href='#'>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <p>Digital Booking</p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
