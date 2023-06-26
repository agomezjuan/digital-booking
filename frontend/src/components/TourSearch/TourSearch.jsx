import { Controller, useForm } from 'react-hook-form';
import Calendar from 'react-multi-date-picker';
import useMediaQuery from '../../hooks/useMediaQuery';
import { months } from '../../util/arrayUtils';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import './TourSearch.scss';

const TourSearch = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <section className='tour-search'>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)} className='tour-search-form'>
          <div className='input-wrapper'>
            <label htmlFor='destination' className='input-label'>
              Destino de búsqueda*
            </label>

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
            <Controller
              control={control}
              name='checkin'
              render={({
                field: { onChange, name, value },
                formState: { errors },
              }) => (
                <>
                  <Calendar
                    numberOfMonths={useMediaQuery('(max-width: 768px)') ? 1 : 2}
                    value={value || ''}
                    range
                    placeholder='Seleccionar fechas'
                    months={months}
                    weekDays={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
                    dateSeparator=' a '
                    format='MMMM DD'
                    minDate={new Date()}
                    calendarPosition='bottom-center'
                    onChange={onChange}
                    className={
                      useMediaQuery('(max-width: 768px)') ? 'rmdp-mobile' : ''
                    }
                    mobileLabels={{
                      OK: 'Aceptar',
                      CANCEL: 'Cancelar',
                    }}
                  />
                  {errors &&
                    errors[name] &&
                    errors[name].type === 'required' && (
                      <span>Este valor es requerido!</span>
                    )}
                </>
              )}
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
