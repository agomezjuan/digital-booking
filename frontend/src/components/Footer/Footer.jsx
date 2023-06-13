import FooterBottom from './FooterBottom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-top'>
        <div className='container'>
          <div className='footer-brand'>
            <a href='#' className='logo'>
              <img src='./src/assets/images/logo.png' alt='Hospic logo' />
            </a>

            <p className='footer-text'>
              Queremos brindarte una experiencia inolvidable, llena de
              comodidad, atención personalizada y detalles únicos que harán de
              tu estadía algo especial.
            </p>
          </div>

          <div className='footer-contact'>
            <h4 className='contact-title'>CONTÁCTENOS</h4>

            <p className='contact-text'>
              ¡No dude en contactarnos y comunicarse con nosotros!
            </p>

            <ul>
              <li className='contact-item'>
                <ion-icon name='call-outline'></ion-icon>

                <a href='cel:+57 031287872633' className='contact-link'>
                  +57 (312) 8782 633
                </a>
              </li>

              <li className='contact-item'>
                <ion-icon name='mail-outline'></ion-icon>

                <a href='mailto:info@hospic.com' className='contact-link'>
                  info@hospic.com
                </a>
              </li>

              <li className='contact-item'>
                <ion-icon name='location-outline'></ion-icon>

                <address>10001 Bogotá, Colombia</address>
              </li>
            </ul>
          </div>

          <div className='footer-form'>
            <p className='form-text'>
              ¡Suscríbase a nuestro boletín para obtener más actualizaciones y
              noticias!
            </p>

            <form action='' className='form-wrapper'>
              <input
                type='email'
                name='email'
                className='input-field'
                placeholder='Introduce tu correo electrónico'
                required
              />

              <button type='submit' className='btn btn-secondary'>
                Suscribir
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
