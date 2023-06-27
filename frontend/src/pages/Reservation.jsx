import { useNavigate } from 'react-router-dom';
import { FooterBottom, Header, Spinner, TopSection } from '../components';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Reservation = () => {
  const navigate = useNavigate();
  const { currentHotel, status } = useSelector((state) => state.hotel);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const loading = status === 'loading';

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login?redirect=login-required');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header />
      <TopSection hotelName={currentHotel?.name} />
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '400px',
            width: '100%',
            flexGrow: 1,
          }}
        >
          <Spinner />
          <p>Cargando...</p>{' '}
        </div>
      ) : null}
      <FooterBottom />
    </>
  );
};

export default Reservation;
