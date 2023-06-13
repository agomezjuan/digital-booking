import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/authActions';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Swal from 'sweetalert2';
import { resetUserError } from '../store/slices/authSlice';
import SubmitButton from '../components/SubmitButton/SubmitButton';
import SocialIcons from '../components/SocialIcons/SocialIcons';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, isLoggedIn, error } = useSelector(
    (state) => state.auth,
  );
  const loading = status === 'loading';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }

    if (error?.code === 403) {
      Swal.fire({
        title: 'Activa tu cuenta',
        html: `<span style="font-size: 13px;">Tu usuario se encuentra inactivo porque no has verificado tu correo electrónico. Revisa tu buzón y haz click en el link de verificación. Si no lo encuentras, verifica la carpeta de spam o correo no deseado.</span>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0084b8',
        cancelButtonColor: '#999999',
        confirmButtonText: 'Reenviar link de verificación',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(resetUserError());
          navigate('/login');
        }
      });
    }
  }, [user, isLoggedIn, status, error]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <>
      <div
        style={{
          backgroundColor: '#11111FCC',
          height: '122px',
          position: 'fixed',
          width: '100%',
          zIndex: '100',
        }}
      >
        <Header />
      </div>
      <div className='login-body'>
        <div className='wrapper'>
          <form className={`login`} onSubmit={handleSubmit(onSubmit)}>
            <p className='title'>Iniciar Sesión</p>
            <div className='input-wrapper'>
              <input
                type='text'
                placeholder='Username'
                autoFocus
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
              <i className='fa fa-user'></i>
            </div>
            <div className='input-wrapper'>
              <input
                type='password'
                placeholder='Password'
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
              {/* <i className='fa fa-key'></i> */}
            </div>
            <Link to='/forgot-password'>¿Olvidé mi contraseña?</Link>
            <SubmitButton loading={loading} text='Iniciar Sesión' />
            <span>
              ¿No tienes cuenta? <Link to='/register'>Regístrate</Link>
            </span>
          </form>
          <footer className='login-footer'>
            <SocialIcons />
            <p>Digital Booking</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Login;
