import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'react-multi-date-picker';
import '../AvailableProductDates/AvailableProductDates.scss';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Link } from 'react-router-dom';

function AvailableProductDates({ id }) {
  const datePickerRef = useRef();
  const [dates, setDates] = useState([]);
  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
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

  const totalDays =
    Math.ceil(
      Math.abs(dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24),
    ) + 1;

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
            onChange={setDates}
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
