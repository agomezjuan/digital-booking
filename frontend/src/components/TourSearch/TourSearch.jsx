import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar, { DateObject } from 'react-multi-date-picker';
import useMediaQuery from '../../hooks/useMediaQuery';
import {
  setDestination,
  setPeople,
  setDates as setSelectedDates,
} from '../../store/slices/reservationSlice';
import { months } from '../../util/arrayUtils';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import './TourSearch.scss';
import LocationSearch from '../LocationSearch/LocationSearch';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHotels } from '../../store/actions/hotelActions';

const TourSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [dates, setDates] = useState([]);
  const { hotels } = useSelector((state) => state.hotel);
  const { dates: selectedDates, destination } = useSelector(
    (state) => state.reservation,
  );
  const { register, handleSubmit, setValue, control } = useForm();

  const onSubmit = (data) => {
    // Si estamos en la home, navegamos a la pagina de resultados
    dispatch(setDestination(data.destination));
    dispatch(setPeople(data.people));

    if (pathname === '/') {
      navigate('/search');
    }
  };

  useEffect(() => {
    // Si hay fechas seleccionadas, las seteamos en el state
    if (selectedDates.length > 0) {
      setDates(selectedDates.map((date) => new DateObject(date)));
    }

    if (destination !== '') {
      setValue('destination', destination);
    }

    if (hotels?.length == 0) {
      dispatch(getHotels());
    }
  }, [dispatch, selectedDates]);

  /**
   * Setea las fechas seleccionadas en el state y en el store
   * @param {*} dates
   */
  const handleSelectDates = (dates) => {
    setDates(dates);
    dispatch(setSelectedDates(dates.map((date) => date.format('YYYY/MM/DD'))));
    setValue(
      'checkin',
      dates.length === 2
        ? [dates[0].format('YYYY/MM/DD'), dates[1].format('YYYY/MM/DD')]
        : [dates[0].format('YYYY/MM/DD')],
    );
  };

  return (
    <section className='tour-search'>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)} className='tour-search-form'>
          {/*  */}
          <LocationSearch control={control} setValue={setValue} />
          <div className='input-wrapper'>
            <label htmlFor='people' className='input-label'>
              Número de ocupantes*
            </label>
            {/* Input de seleccion de numero de personas */}
            <input
              type='number'
              id='people'
              min={1}
              max={10}
              defaultValue={1}
              required
              placeholder='No. de Personas'
              className='input-field'
              {...register('people', { required: true })}
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
              required
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
            Buscar Hoteles
          </button>
        </form>
      </div>
    </section>
  );
};

export default TourSearch;
