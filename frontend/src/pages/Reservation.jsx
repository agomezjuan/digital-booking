import { useNavigate, useParams } from 'react-router-dom';
import {
  FooterBottom,
  Header,
  ProductPolicy,
  Spinner,
  Stars,
  TopSection,
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import './Reservation.scss';
import { useForm } from 'react-hook-form';
import useMediaQuery from '../hooks/useMediaQuery';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker';
import { months, days, convertDates } from '../util/arrayUtils';
import { setDates as setSelectedDates } from '../store/slices/reservationSlice';
import { getHotel } from '../store/actions/hotelActions';
import Swal from 'sweetalert2';

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datePickerRef = useRef();
  const { id } = useParams();
  const [dates, setDates] = useState([]);
  const [time, setTime] = useState('');
  const { currentHotel, status } = useSelector((state) => state.hotel);
  const { dates: selectedDates } = useSelector((state) => state.reservation);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      city: '',
      startDate: '',
      endDate: '',
      hotelId: '',
      userId: '',
      status: '',
      total: '',
      paymenMethod: '',
    },
  });
  const loading = status === 'loading';
  console.log(time);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      navigate('/login?redirect=login-required');
    }

    if (!currentHotel) {
      dispatch(getHotel(id));
    }

    if (selectedDates.length > 0) {
      setDates(selectedDates.map((date) => new DateObject(date)));
    }
    setValue('name', user.name);
    setValue('lastname', user.lastname);
    setValue('email', user.email);
    setValue('city', user.city);
    setValue('hotelId', currentHotel?.id);
    setValue('userId', user.id);
    setValue('status', 'confirmed');
    setValue('total', currentHotel?.price);
    setValue('paymenMethod', 'credit card');
    setValue('startDate', selectedDates[0]);
    setValue('endDate', selectedDates[1]);
  }, [isLoggedIn, navigate]);

  const onSubmit = (data) => {
    if (dates.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar las fechas de tu estadía',
      });
      return;
    }
    if (!time) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar la hora de tu llegada',
      });
      return;
    }

    data.startDate = dates[0].format();
    data.endDate = dates.length === 2 ? dates[1].format() : dates[0].format();
    data.time = time.format();

    console.log(data);
  };

  const handleSelectTime = (time) => {
    setTime(time);
    console.log(time.format());
  };

  const handleSelectDates = (dates) => {
    setDates(dates);
    console.log(dates[0].format());
    dispatch(setSelectedDates(convertDates(dates)));
  };

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
                  <h2>Completa tus datos</h2>
                </div>
                <div className='reservation-left-form'>
                  <form>
                    <div className='reservation-left-form-input'>
                      <label htmlFor='name'>Nombre</label>
                      <input
                        type='text'
                        id='name'
                        placeholder='Nombre'
                        {...register('name', { required: true })}
                      />
                    </div>
                    <div className='reservation-left-form-input'>
                      <label htmlFor='lastname'>Apellido</label>
                      <input
                        type='text'
                        id='lastname'
                        placeholder='Apellido'
                        {...register('lastname', { required: true })}
                      />
                    </div>
                    <div className='reservation-left-form-input'>
                      <label htmlFor='email'>Correo electrónico</label>
                      <input
                        type='email'
                        id='email'
                        placeholder='Correo'
                        {...register('email', { required: true })}
                      />
                    </div>
                    <div className='reservation-left-form-input'>
                      <label htmlFor='city'>Ciudad</label>
                      <input
                        type='text'
                        id='city'
                        placeholder='Ciudad'
                        {...register('city', { required: true })}
                      />
                    </div>
                  </form>
                  <div className='ContainerAvailableDates'>
                    <div className='ContainerCalendarButton'>
                      <h2>Selecciona tus fechas</h2>
                      <Calendar
                        numberOfMonths={
                          useMediaQuery('(max-width: 768px)') ? 1 : 2
                        }
                        disableMonthPicker
                        disableYearPicker
                        range
                        minDate={new Date()}
                        highlightToday={true}
                        weekDays={days}
                        months={months}
                        ref={datePickerRef}
                        value={dates}
                        onChange={handleSelectDates}
                        rangeHover
                        mapDays={() => {
                          // Agregar la lógica para deshabilitar las fechas
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='reservation-left-title'>
                  <h2>Tu horario de llegada</h2>
                </div>
                <div className='reservation-left-form'>
                  <div className='form-fields'>
                    <p>
                      <ion-icon name='checkmark-circle'></ion-icon> Tu
                      habitación va a estar lista para el check-in a partir de
                      las 15:00hs.
                    </p>
                    <DatePicker
                      disableDayPicker
                      format='HH:mm A'
                      onChange={handleSelectTime}
                      value={time}
                      plugins={[
                        <TimePicker
                          key={0}
                          minTime={{ hour: 15, minute: 0 }}
                          maxTime={{ hour: 3, minute: 0 }}
                          hideSeconds
                        />,
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className='reservation-right'>
                <div className='reservation-right-card'>
                  <div className='reservation-right-card-title'>
                    <h2>Detalle de la reserva</h2>
                  </div>
                  <div className='reservation-right-card-image'>
                    <img src={currentHotel?.images[2]} alt='Hotel' />
                  </div>
                  <div className='reservation-right-card-info'>
                    <div className='reservation-right-card-info-title'>
                      <span>Hotel</span>
                      <h2>{currentHotel?.name}</h2>
                      <Stars rating={currentHotel?.rating} />
                    </div>
                    <div className='reservation-right-card-info-location'>
                      <p>
                        <ion-icon name='location'></ion-icon>{' '}
                        {currentHotel?.address.street}{' '}
                        {currentHotel?.address.number},{' '}
                        {currentHotel?.address.city},{' '}
                        {currentHotel?.address.country}
                      </p>
                    </div>
                    <div className='reservation-right-card-info-date'>
                      <p>
                        <table>
                          <tr>
                            <td>
                              <ion-icon name='calendar-outline'></ion-icon>{' '}
                              Check in:
                            </td>
                            <td>{selectedDates[0]}</td>
                          </tr>
                        </table>
                      </p>
                      <p>
                        <table>
                          <tr>
                            <td>
                              <ion-icon name='calendar-outline'></ion-icon>{' '}
                              Check out:
                            </td>
                            <td>
                              {selectedDates.length === 2
                                ? selectedDates[1]
                                : selectedDates[0]}
                            </td>
                          </tr>
                        </table>
                      </p>
                    </div>
                    <div className='reservation-right-card-info-people'>
                      <p>
                        <ion-icon name='person-outline'></ion-icon> 2 personas
                      </p>
                    </div>
                    <div className='reservation-right-card-info-price'>
                      <ion-icon name='cash-outline'></ion-icon>{' '}
                      <p>{currentHotel?.adultPrice} USD</p>
                    </div>
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className='reservation-right-card-info-button'
                    >
                      <span>Reservar</span>
                    </button>
                  </div>
                </div>
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
