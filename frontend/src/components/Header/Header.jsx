import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <header className='header' data-testid='header' data-header>
      <div className='header-top'>
        <div className='container'>
          <div className='logo-wrapper'>
            <Link to='/' className='logo'>
              <img src={logo} alt='Digital Booking logo' />
            </Link>

            {/* <p className='slogan'>Explora. Vive. Hospedate.</p> */}
          </div>
          {isLoggedIn ? (
            <div className='user'>
              <div>
                <p className='slogan'>Hola, {user?.name}</p>
              </div>
              <div>
                <div className='avatar'>
                  <span>
                    {user?.name[0]}
                    {user?.lastname[0]}
                  </span>
                </div>
              </div>

              <button onClick={handleLogout} className='btn btn-primary'>
                <ion-icon name='log-out-outline'></ion-icon>
              </button>
            </div>
          ) : (
            <div className='header-btn-group'>
              <Link to='/register' className='btn btn-secondary'>
                Crear cuenta
              </Link>
              <Link to='/login' className='btn btn-primary'>
                Iniciar sesión
              </Link>
              {/* <button className='search-btn' aria-label='Search'>
                <ion-icon name='search'></ion-icon>
              </button> */}
            </div>
          )}
        </div>
      </div>

      <div className='header-bottom'>
        <div className='container'>
          <nav className='navbar' data-navbar>
            <div className='navbar-top'>
              <div className='logo-wrapper'>
                <Link to='/admin' className='logo'>
                  <img src={logo} alt='Hospic logo' />
                </Link>

                <p className='slogan'>Explora.Vive. Hospedate</p>
              </div>
              {/* ... */}
            </div>
            <ul className='navbar-list'>{/* ... */}</ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
