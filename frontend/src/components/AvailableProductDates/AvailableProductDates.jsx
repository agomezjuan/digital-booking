import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar, DateObject } from 'react-multi-date-picker';
import '../AvailableProductDates/AvailableProductDates.scss';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDates as setSelectedDates } from '../../store/slices/reservationSlice';

function AvailableProductDates({ id }) {
  const dispatch = useDispatch();
  const datePickerRef = useRef();
  const [dates, setDates] = useState([]);
  const { dates: selectedDates } = useSelector((state) => state.reservation);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio ',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  useEffect(() => {
    if (selectedDates.length > 0) {
      setDates(selectedDates.map((date) => new DateObject(date)));
    }
  }, []);

  function formatDate(date) {
    if (!date) return;
    const week = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const weekDay = week[date.weekDay.index];
    const day = date.day;
    const month = date.month.index;

    return `${weekDay} ${day} de ${months[month]}`;
  }

  const startDate = formatDate(dates[0]);

  const endDate = formatDate(dates[dates.length - 1]);

  const totalDays = Math.ceil(
    Math.abs(dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24),
  );

  function convertDates(dates) {
    const newDates =
      dates.length == 2
        ? dates.map((date) => date.format())
        : [dates[0].format()];
    return newDates;
  }

  const handleSelectDates = (dates) => {
    setDates(dates);
    console.log(dates[0].format());
    dispatch(setSelectedDates(convertDates(dates)));
  };

  return (
    <div className='ContainerAvailableDates'>
      <div className='container'>
        <h2>Fechas disponibles</h2>
        <div className='ContainerCalendarButton'>
          <Calendar
            numberOfMonths={useMediaQuery('(max-width: 768px)') ? 1 : 2}
            disableMonthPicker
            disableYearPicker
            range
            minDate={new Date()}
            highlightToday={true}
            weekDays={weekDays}
            months={months}
            ref={datePickerRef}
            value={dates}
            onChange={handleSelectDates}
            rangeHover
            mapDays={() => {
              // Agregar la lógica para deshabilitar las fechas
            }}
          />
          <div className='ContainerStartBooking'>
            {dates.length > 0 ? (
              startDate === endDate ? (
                <p>Has elegido el {startDate}</p>
              ) : (
                <p>
                  Has elegido desde el {startDate} hasta el {endDate}.
                  <br />
                  {totalDays} dias en total.
                </p>
              )
            ) : (
              <p>Agrega tus fechas de viaje para obtener precios exactos</p>
            )}
            <Link to={`/hotel/${id}/booking`}>
              <button className='ContainerStartBookingButton'>
                Iniciar reserva
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

AvailableProductDates.propTypes = {
  id: PropTypes.string,
};

export default AvailableProductDates;
