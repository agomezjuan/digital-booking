import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar, { DateObject } from 'react-multi-date-picker';
import useMediaQuery from '../../hooks/useMediaQuery';
import { setDates as setSelectedDates } from '../../store/slices/reservationSlice';
import { months } from '../../util/arrayUtils';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import './TourSearch.scss';

const TourSearch = () => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const { dates: selectedDates } = useSelector((state) => state.reservation);

  // TODO: Add validation to form and handle submit
  const handleSubmit = (data) => console.log(data);

  useEffect(() => {
    // Si hay fechas seleccionadas, las seteamos en el state
    if (selectedDates.length > 0) {
      setDates(selectedDates.map((date) => new DateObject(date)));
    }
  }, [dispatch, selectedDates]);

  /**
   * Setea las fechas seleccionadas en el state y en el store
   * @param {*} dates
   */
  const handleSelectDates = (dates) => {
    setDates(dates);
    dispatch(setSelectedDates(dates.map((date) => date.format('YYYY/MM/DD'))));
  };

  return (
    <section className='tour-search'>
      <div className='container'>
        <form onSubmit={handleSubmit} className='tour-search-form'>
          <div className='input-wrapper'>
            <label htmlFor='destination' className='input-label'>
              Destino de búsqueda*
            </label>
            {/* Input de seleccion del destino */}
            <input
              type='text'
              name='destination'
              id='destination'
              required
              placeholder='Introducir destino'
              className='input-field'
            />
          </div>

          <div className='input-wrapper'>
            <label htmlFor='people' className='input-label'>
              Número de ocupantes*
            </label>
            {/* Input de seleccion de numero de personas */}
            <input
              type='number'
              name='people'
              id='people'
              min={1}
              required
              placeholder='No. de Personas'
              className='input-field'
            />
          </div>

          <div className='input-wrapper'>
            <label htmlFor='checkin' className='input-label'>
              Checkin - Checkout*
            </label>
            {/* Input de seleccion de fechas */}
            <Calendar
              numberOfMonths={useMediaQuery('(max-width: 768px)') ? 1 : 2}
              value={dates}
              range
              rangeHover
              placeholder='Seleccionar fechas'
              months={months}
              weekDays={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
              dateSeparator=' a '
              format='MMMM DD'
              minDate={new Date()}
              calendarPosition='bottom-center'
              onChange={handleSelectDates}
              className={
                useMediaQuery('(max-width: 768px)') ? 'rmdp-mobile' : ''
              }
              mobileLabels={{
                OK: 'Aceptar',
                CANCEL: 'Cancelar',
              }}
            />
          </div>

          <button type='submit' className='btn btn-secondary'>
            Reservar Ahora
          </button>
        </form>
      </div>
    </section>
  );
};

export default TourSearch;
