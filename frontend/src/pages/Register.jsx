import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import './Register.css';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className='register-body'>
      <div className='wrapper'>
        <form
          className={`register`} // className={`register ${isRegistered ? 'ok' : ''}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className='register-title'>Registro</p>
          <div className='register-input-wrapper'>
            <input
              type='text'
              placeholder='Nombre'
              autoFocus
              {...register('name', { required: true })}
            />
            {errors.name && <span>Este campo es requerido</span>}
            <i className='fa fa-user'></i>
          </div>
          <div className='register-input-wrapper'>
            <input
              type='text'
              placeholder='Apellido'
              {...register('lastname', { required: true })}
            />
            {errors.name && <span>Este campo es requerido</span>}
            <i className='fa fa-user'></i>
          </div>
          <div className='register-input-wrapper'>
            <input
              type='email'
              placeholder='Correo electrónico'
              {...register('email', { required: true })}
            />
            {errors.name && <span>Este campo es requerido</span>}
            <i className='fa fa-envelope'></i>
          </div>
          <div className='register-input-wrapper'>
            <input
              type='password'
              placeholder='Contraseña'
              {...register('password', { required: true })}
            />
            {errors.name && <span>Este campo es requerido</span>}
            <i className='fa fa-key'></i>
          </div>
          <button type='submit' className='register-button'>
            Registrarse
          </button>
          <p>
            ¿Ya tienes cuenta? <Link to='/login'>Iniciar Sesion</Link>
          </p>
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
