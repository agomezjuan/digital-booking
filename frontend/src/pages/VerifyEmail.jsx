import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { verifyUserEmail } from '../store/actions/authActions';
import Header from '../components/Header/Header';
import SubmitButton from '../components/SubmitButton/SubmitButton';
import Spinner from '../components/Spinner/Spinner';
import { resetUserError } from '../store/slices/authSlice';
// import Footer from '../components/Footer/Footer';

const VerifyEmail = () => {
  const [response, setResponse] = useState(''); //[{}
  const { token } = useParams();
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.auth);
  const loading = status === 'loading';

  useEffect(() => {
    dispatch(verifyUserEmail(token));
    if (status === 'succeeded') {
      setResponse(message);
    } else if (status === 'failed') {
      setResponse(message);
    }
    return () => {
      dispatch(resetUserError());
    };
  }, []);

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
      <main className='verify-email-body'>
        <div className='wrapper'>
          <div className='box'>
            <h2>Verificación de cuenta</h2>
            {loading ? (
              <Spinner mode={'dark'} />
            ) : (
              <>
                <p>{response}</p>
                <Link to='/login'>
                  <SubmitButton text='Iniciar Sesión' />
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default VerifyEmail;
