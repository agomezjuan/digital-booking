import { useState } from 'react';
import './LocationSearch.scss';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { setDestination } from '../../store/slices/reservationSlice';
import { useDispatch, useSelector } from 'react-redux';

const LocationSearch = ({ control, setValue }) => {
  const dispatch = useDispatch();
  const { cities: options } = useSelector((state) => state.hotel);
  const [isFocus, setIsFocus] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const focusHandler = () => {
    setIsFocus(true);
  };

  const blurHandler = () => {
    setIsFocus(false);
  };

  const handleSelect = (option) => {
    setValue('destination', option);
    dispatch(setDestination(option));
    setIsFocus(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setValue('destination', value);
    dispatch(setDestination(value));

    // Filtrar las opciones basado en el valor ingresado
    const newOptions = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase()),
    );

    // Actualizar las opciones filtradas
    setFilteredOptions(newOptions);
  };

  return (
    <div className='input-wrapper destination'>
      <label
        htmlFor='destination'
        className='input-label'
        onFocus={focusHandler}
        onBlur={blurHandler}
      >
        Destino de búsqueda*
      </label>
      {/* Input de seleccion del destino */}
      <Controller
        control={control}
        name='destination'
        render={({ field: { name, value } }) => (
          <input
            onBlur={blurHandler}
            onChange={handleInputChange}
            onFocus={focusHandler}
            className='input-field'
            value={value || ''}
            name={name}
            autoComplete='off'
            placeholder='Elige tu destino'
          />
        )}
      />

      {isFocus && (
        <ul className='city-options'>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              if (index < 5) {
                return (
                  <li
                    key={option}
                    onMouseDown={() => {
                      handleSelect(option);
                    }}
                  >
                    <span>
                      <ion-icon name='location-outline'></ion-icon>
                      {option}
                    </span>
                  </li>
                );
              }
            })
          ) : (
            <li>
              <span>No hay resultados</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

LocationSearch.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default LocationSearch;
