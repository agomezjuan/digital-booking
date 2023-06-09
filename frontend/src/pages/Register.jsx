import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import './Register.scss';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../store/actions/authActions';
import { useEffect } from 'react';
import Header from '../components/Header/Header';
import { resetUserError } from '../store/slices/authSlice';
import SubmitButton from '../components/SubmitButton/SubmitButton';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn, status, error } = useSelector(
    (state) => state.auth,
  );
  const loading = status === 'loading';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else if (status === 'succeeded') {
      reset();
      Swal.fire({
        title: 'Registro exitoso',
        html: `<h2>Bienvenido@ ${user?.name}</h2><span style="font-size: 12px;">Hemos enviado un link de verificación a tu dirección de correo electrónico registrada. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para completar el proceso de validación. Si no recibes el correo electrónico en unos minutos, verifica la carpeta de spam o correo no deseado.</span>`,
        icon: 'success',
        confirmButtonColor: '#0084b8',
        confirmButtonText: 'Aceptar',
      });
      dispatch(resetUserError());
      navigate('/');
    }

    if (status === 'failed') {
      if (error?.code === 409) {
        Swal.fire({
          title: 'Error',
          html: `<h3>El correo ya está registrado</h3><span style="font-size: 12px;">Por favor, inicia sesión o intenta con otro correo electrónico</span>`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0084b8',
          cancelButtonColor: '#999999',
          confirmButtonText: 'Iniciar sesión',
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(resetUserError());
            navigate('/login');
          }
        });
      }
    }
  }, [user, isLoggedIn, status, error]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#11111FCC',
          height: '122px',
          position: 'fixed',
          width: '100%',
        }}
      >
        <Header />
      </div>
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
                style={
                  errors.name && {
                    border: '2px solid red',
                    backgroundColor: '#FFD2D2',
                  }
                }
              />
              {errors.name && (
                <span className='error'>Este campo es requerido</span>
              )}
              <i className='fa fa-user'></i>
            </div>
            <div className='register-input-wrapper'>
              <input
                type='text'
                placeholder='Apellido'
                {...register('lastname', { required: true })}
                style={
                  errors.lastname && {
                    border: '2px solid red',
                    backgroundColor: '#FFD2D2',
                  }
                }
              />
              {errors.lastname && (
                <span className='error'>Este campo es requerido</span>
              )}

              <i className='fa fa-user'></i>
            </div>
            <div className='register-input-wrapper'>
              <input
                type='email'
                placeholder='Correo electrónico'
                {...register('email', { required: true })}
                style={
                  errors.email && {
                    border: '2px solid red',
                    backgroundColor: '#FFD2D2',
                  }
                }
              />
              {errors.email && (
                <span className='error'>Este campo es requerido</span>
              )}
              {error?.code == 409 && (
                <span className='error'>{error.message}</span>
              )}
              <i className='fa fa-envelope'></i>
            </div>
            <div className='register-input-wrapper'>
              <input
                type='password'
                placeholder='Contraseña'
                {...register('password', { required: true })}
                style={
                  errors.password && {
                    border: '2px solid red',
                    backgroundColor: '#FFD2D2',
                  }
                }
              />
              {errors.password && (
                <span className='error'>Este campo es requerido</span>
              )}
              <i className='fa fa-key'></i>
            </div>
            <SubmitButton loading={loading} text='Registrarse' />
            <span>
              ¿Ya tienes cuenta? <Link to='/login'>Iniciar Sesion</Link>
            </span>
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
    </>
  );
};

export default Register;
