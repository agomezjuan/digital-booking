import logo from '../../assets/images/logo-blue.png';
const Header = () => {
  return (
    <header className='header' data-testid='header' data-header>
      <div className='overlay' data-overlay></div>

      <div className='header-top'>
        <div className='container'>
          <a href='cel:+57 031287872633' className='helpline-box'>
            <div className='icon-box'>
              <ion-icon name='call-outline'></ion-icon>
            </div>

            <div className='wrapper'>
              <p className='helpline-title'>Para más consultas:</p>

              <p className='helpline-number'>+57 31287872633</p>
            </div>
          </a>

          <a href='#' className='logo'>
            <img src={logo} alt='Hospic logo' />
          </a>

          <div className='header-btn-group'>
            <button className='search-btn' aria-label='Search'>
              <ion-icon name='search'></ion-icon>
            </button>

            <button
              className='nav-open-btn'
              aria-label='Open Menu'
              data-nav-open-btn
            >
              <ion-icon name='menu-outline'></ion-icon>
            </button>
          </div>
        </div>
      </div>

      <div className='header-bottom'>
        <div className='container'>
          <ul className='social-list'>
            <li>
              <a href='#' className='social-link'>
                <ion-icon name='logo-facebook'></ion-icon>
              </a>
            </li>

            <li>
              <a href='#' className='social-link'>
                <ion-icon name='logo-twitter'></ion-icon>
              </a>
            </li>

            <li>
              <a href='#' className='social-link'>
                <ion-icon name='logo-youtube'></ion-icon>
              </a>
            </li>
          </ul>

          <nav className='navbar' data-navbar>
            <div className='navbar-top'>
              <a href='#' className='logo'>
                <img
                  src='./src/assets/images/logo-blue.png'
                  alt='Hospic logo'
                />
              </a>

              <button
                className='nav-close-btn'
                aria-label='Close Menu'
                data-nav-close-btn
              >
                <ion-icon name='close-outline'></ion-icon>
              </button>
            </div>

            <ul className='navbar-list'>
              <li>
                <a href='#home' className='navbar-link' data-nav-link>
                  home
                </a>
              </li>

              <li>
                <a href='#' className='navbar-link' data-nav-link>
                  Sobre Nosotros
                </a>
              </li>

              <li>
                <a href='#destination' className='navbar-link' data-nav-link>
                  Hospedaje
                </a>
              </li>

              <li>
                <a href='#package' className='navbar-link' data-nav-link>
                  Paquetes
                </a>
              </li>

              <li>
                <a href='#gallery' className='navbar-link' data-nav-link>
                  Galería
                </a>
              </li>

              <li>
                <a href='#contact' className='navbar-link' data-nav-link>
                  Contáctenos
                </a>
              </li>
            </ul>
          </nav>

          <button className='btn btn-primary'>Reservar Ahora</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
