import { useNavigate } from 'react-router-dom';
import {
  FooterBottom,
  Header,
  ProductPolicy,
  Spinner,
  TopSection,
} from '../components';
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
      ) : (
        <>
          <div className='reservation'>
            <div className='container'>
              <div className='reservation-left'>
                <div className='reservation-left-title'>
                  <h2>Reserva</h2>
                </div>
                <div className='reservation-left-form'></div>
              </div>
              <div className='reservation-right'>
                <div className='reservation-right-card'></div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className='ContainerProductFeatures'>
        <div className='ContainerTitleFeatures'>
          <div className='container'>
            <h2>¿Qué tienes que saber?</h2>
          </div>
        </div>
        <div className='container'>
          <ProductPolicy />
        </div>
      </div>
      <FooterBottom />
    </>
  );
};

export default Reservation;
