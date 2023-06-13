import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { verifyUserEmail } from '../store/actions/authActions';
import { resetUserError } from '../store/slices/authSlice';
import { FooterBottom, Header, Spinner, SubmitButton } from '../components';

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.auth);
  const loading = status === 'loading';

  useEffect(() => {
    dispatch(verifyUserEmail(token));

    return () => {
      dispatch(resetUserError());
    };
  }, [dispatch, token]);

  return (
    <>
      <main className='verify-email-body'>
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
        <div className='wrapper'>
          <div className='box'>
            <h2>Verificación de cuenta</h2>
            {loading ? (
              <Spinner mode={'dark'} />
            ) : (
              <>
                <p>{message}</p>
                <Link to='/'>
                  <SubmitButton text='Volver a inicio' />
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
      <FooterBottom />
    </>
  );
};

export default VerifyEmail;
