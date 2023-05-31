import logo from '../../assets/images/logo-blue.png';
import './Header.css';

const Header = () => {
  return (
    <header className='header' data-testid='header' data-header>
      <div className='header-top'>
        <div className='container'>
          <div className='logo-wrapper'>
            <a href='/' className='logo'>
              <img src={logo} alt='Hospic logo' />
            </a>

            <p className='slogan'>Explora.Vive. Hospedate</p>
          </div>

          <div className='header-btn-group'>
            <button className='btn btn-secondary'>Crear cuenta</button>
            <button className='btn btn-primary'>Iniciar sesión</button>
            <button className='search-btn' aria-label='Search'>
              <ion-icon name='search'></ion-icon>
            </button>
          </div>
        </div>
      </div>

      <div className='header-bottom'>
        <div className='container'>
          <nav className='navbar' data-navbar>
            <div className='navbar-top'>
              <div className='logo-wrapper'>
                <a href='/' className='logo'>
                  <img src={logo} alt='Hospic logo' />
                </a>

                <p className='slogan'>Explora.Vive. Hospedate</p>
              </div>
              {/* ... */}
            </div>
            <ul className='navbar-list'>
              {/* ... */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
