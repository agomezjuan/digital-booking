import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/authActions';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
  }, [isLoggedIn]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
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
            />
            {errors.email && <span>Este campo es requerido</span>}
            <i className='fa fa-user'></i>
          </div>
          <div className='input-wrapper'>
            <input
              type='password'
              placeholder='Password'
              {...register('password', { required: true })}
            />
            {errors.password && <span>Este campo es requerido</span>}
            <i className='fa fa-key'></i>
          </div>
          {/* <a href='#'>Forgot your password?</a> */}
          <button type='submit'>Log in</button>
          <span>
            ¿No tienes cuenta? <Link to='/register'>Regístrate</Link>
          </span>
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
