import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'react-multi-date-picker';
import '../AvailableProductDates/AvailableProductDates.scss';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Link } from 'react-router-dom';

function AvailableProductDates({ id }) {
  const datePickerRef = useRef();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className='ContainerAvailableDates'>
      <h2>Fechas disponibles</h2>
      <div className='ContainerCalendarButton'>
        <Calendar
          numberOfMonths={useMediaQuery('(max-width: 706px)') ? 1 : 2}
          disableMonthPicker
          disableYearPicker
          minDate={new Date()}
          hideYear
          weekDays={weekDays}
          ref={datePickerRef}
          mapDays={() => {
            // Agregar la lógica para deshabilitar las fechas
          }}
        />
        <div className='ContainerStartBooking'>
          <p>Agrega tus fechas de viaje para obtener precios exactos</p>
          <Link to={`/product/${id}/booking`}>
            <button className='ContainerStartBookingButton'>
              Iniciar reserva
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

AvailableProductDates.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AvailableProductDates;
