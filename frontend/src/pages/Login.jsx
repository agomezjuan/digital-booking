import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import './Login.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 3000);
  };

  return (
    <div className='login-body'>
      <div className='wrapper'>
        <form
          className={`login ${isAuthenticated ? 'ok' : ''}`}
          onSubmit={handleFormSubmit}
        >
          <p className='title'>Iniciar Sesión</p>
          <div className='input-wrapper'>
            <input type='text' placeholder='Username' autoFocus />
            <i className='fa fa-user'></i>
          </div>
          <div className='input-wrapper'>
            <input type='password' placeholder='Password' />
            <i className='fa fa-key'></i>
          </div>
          <a href='#'>Forgot your password?</a>
          <button type='submit'>Log in</button>
        </form>
        <footer className='loginfooter'>
          <div className='social-icons'>
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

export default Login;
