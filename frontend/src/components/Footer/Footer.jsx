import FooterBottom from './FooterBottom';
import logo from '../../assets/images/logo.png';
import './Footer.scss';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const Footer = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log('Suscribir');
    Swal.fire({
      title: '¡Gracias por suscribirte!',
      text: 'Te enviaremos las últimas noticias y actualizaciones',
      icon: 'success',
      confirmButtonText: '¡CONTINUAR!',
      confirmButtonColor: 'hsl(197, 66%, 55%)',
      background: 'hsl(0, 0%, 88%)',
      backdrop: `
        rgba(0,0,0,0.5)`,
    });
    console.log(data);
    reset();
  };
  return (
    <footer className='footer'>
      <div className='footer-top'>
        <div className='container'>
          <div className='footer-brand'>
            <a href='#' className='logo'>
              <img src={logo} alt='Hospic logo' />
            </a>

            <p className='footer-text'>
              Queremos brindarte una experiencia inolvidable, llena de
              comodidad, atención personalizada y detalles únicos que harán de
              tu estadía algo especial.
            </p>
          </div>

          <div className='footer-contact'>
            <h4 className='contact-title'>CONTÁCTENOS</h4>

            <ul>
              <li className='contact-item'>
                <ion-icon name='call-outline'></ion-icon>

                <a href='cel:+57 031287872633' className='contact-link'>
                  +57 (312) 8782 633
                </a>
              </li>

              <li className='contact-item'>
                <ion-icon name='mail-outline'></ion-icon>

                <a
                  href='mailto:digitalbooking@ingenial.co'
                  className='contact-link'
                >
                  digitalbooking@ingenial.co
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

            <form onSubmit={handleSubmit(onSubmit)} className='form-wrapper'>
              <input
                type='email'
                className='input-field'
                placeholder='Introduce tu correo electrónico'
                required
                {...register('subscribe', { required: true })}
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
