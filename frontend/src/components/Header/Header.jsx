import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.scss';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu/UserMenu';

const Header = () => {
  // Iniciazar los hooks
  const { pathname } = useLocation();

  // Definir las variables para saber en que pagina estamos
  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';

  // Obtener los datos del store
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <header className='header' data-testid='header' data-header>
      <div className='header-top'>
        <div className='container'>
          <div className='logo-wrapper'>
            <Link to='/' className='logo'>
              <img src={logo} alt='Digital Booking logo' />
              <p className='slogan'>Explora. Vive. Aventúrate.</p>
            </Link>
          </div>
          {isLoggedIn ? (
            <div className='user'>
              <UserMenu />

              {/* <button onClick={handleLogout} className='btn btn-primary'>
                <ion-icon name='log-out-outline'></ion-icon>
              </button> */}
            </div>
          ) : (
            <div className='header-btn-group'>
              {isRegisterPage ? null : (
                <Link to='/register' className='btn btn-secondary'>
                  <ion-icon name='person-add'></ion-icon>
                  <span>Crear cuenta</span>
                </Link>
              )}
              {isLoginPage ? null : (
                <Link to='/login' className='btn btn-primary'>
                  <ion-icon name='log-in'></ion-icon>
                  <span>Iniciar sesión</span>
                </Link>
              )}
              {/* <button className='search-btn' aria-label='Search'>
                <ion-icon name='search'></ion-icon>
              </button> */}
            </div>
          )}
        </div>
      </div>

      {/* <div className='header-bottom'>
        <div className='container'>
          <nav className='navbar' data-navbar>
            <div className='navbar-top'>
              <div className='logo-wrapper'>
                <Link to='/admin' className='logo'>
                  <img src={logo} alt='Hospic logo' />
                </Link>

                <p className='slogan'>Explora.Vive. Hospedate</p>
              </div>
              
            </div>
            <ul className='navbar-list'></ul>
          </nav>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
