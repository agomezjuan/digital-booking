import { useRef, useLayoutEffect, useState } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getReverseGeocodingData } from '../../../../util/reverseGeocoding';
import Swal from 'sweetalert2';
import './CreateHotel.scss';

const CreateHotel = () => {
  const [images, setImages] = useState([]);
  const { categories } = useSelector((state) => state.category);
  const mapDiv = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      street: '',
      number: '',
      city: '',
      country: '',
      longitude: -57.98310726304649,
      latitude: -34.80738384249134,
      phone: '',
      email: '',
      description: '',
      price: '',
      images: [],
    },
  });

  useLayoutEffect(() => {
    const map = new Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-57.98310726304649, -34.80738384249134],
      zoom: 14,
      navigationControl: true,
    });

    const name = getValues('name');

    const myPopup = new Popup({ offset: 25 }).setHTML(`<h4>${name}</h4>`);
    const marker = new Marker({ color: '#41add8' })
      .setLngLat([-57.98310726304649, -34.80738384249134])
      .setPopup(myPopup)
      .addTo(map);

    map.on('click', (e) => reverseGeocode(e, marker, map));
    map.on('dragend', (e) => reverseGeocode(e, marker, map));

    return () => {
      map.remove();
      marker.remove();
    };
  }, []);

  /**
   * Esta función se encarga de obtener los datos de la dirección
   * @param {*} e
   * @param {*} marker
   * @param {*} map
   */
  async function reverseGeocode(e, marker, map) {
    const coordinates = e.lngLat;
    marker.setLngLat([coordinates.lng, coordinates.lat]);

    map.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: 12,
    });

    setValue('longitude', coordinates.lng);
    setValue('latitude', coordinates.lat);
    const { country, city, street, number } = await getReverseGeocodingData(
      coordinates,
    );

    console.log('address', coordinates);

    // Setear los valores en el formulario
    setValue('country', country);
    setValue('city', city);
    setValue('street', street);
    setValue('number', number);
  }

  const handleImages = (e) => {
    console.log('e.target.files', e.target.files);
    const files = e.target.files;

    const fileReaders = [];
    const imageResults = [];
    const allowedFormats = ['image/jpeg', 'image/png'];
    const maxFiles = 10;

    if (files.length > maxFiles) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Se excede el límite máximo de ${maxFiles} archivos.`,
        confirmButtonColor: '#3085d6',
      });
      setImages([]);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file = files[i];

      if (!allowedFormats.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: `El archivo ${file.name} tiene un formato no admitido.<br/>Solo se admiten archivos con formato .jpg o .png.`,
          confirmButtonColor: '#3085d6',
        });
        continue; // Saltar el archivo y pasar al siguiente
      }

      register('images').onChange((e) => {
        e.target.files = files;
      });

      reader.onloadend = () => {
        imageResults.push(reader.result);

        // Comprobar si se han leído todos los archivos
        if (imageResults.length === files.length) {
          // Aquí puedes hacer algo con los resultados de lectura
          setImages(imageResults);
          console.log('imageResults', imageResults);
        }
      };

      // Leer el archivo actual
      reader.readAsDataURL(file);

      // Agregar el FileReader a la lista fileReaders
      fileReaders.push(reader);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='create-hotel'>
      <h3>Crear hotel</h3>

      <form className='create-hotel-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='create-hotel-map'>
          <div ref={mapDiv}></div>
        </div>
        <div className='hotel-form-container'>
          <div className='form-group'>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              id='name'
              className='form-control'
              placeholder='Nombre del hotel'
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className='text-danger'>Este campo es obligatorio</span>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='category'>Categoría</label>
            <select id='category' className='form-control'>
              <option value=''>Selecciona una categoría</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Dirección</label>
            <div className='form-group-address'>
              <div className='form-group-address-street'>
                <input
                  type='text'
                  id='street'
                  className='form-control'
                  placeholder='Calle'
                  {...register('street', { required: true })}
                />
              </div>
              <div className='form-group-address-street'>
                <input
                  type='text'
                  id='number'
                  className='form-control'
                  placeholder='Número'
                  {...register('number')}
                />
              </div>
            </div>
            <div className='form-group-country'>
              <div className='form-group-country-city'>
                <input
                  type='text'
                  id='city'
                  className='form-control'
                  placeholder='Ciudad'
                  {...register('city', { required: true })}
                />
              </div>
              <div className='form-group-country-city'>
                <input
                  type='text'
                  id='country'
                  className='form-control'
                  placeholder='País'
                  {...register('country', { required: true })}
                />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='phone'>Coordenadas</label>
            <div className='form-group-coordinates'>
              <div className='form-group-coordinates-latitude'>
                <input
                  type='text'
                  id='latitude'
                  className='form-control'
                  placeholder='Latitud'
                  {...register('latitude', { required: true })}
                />
              </div>
              <div className='form-group-coordinates-longitude'>
                <input
                  type='text'
                  id='longitude'
                  className='form-control'
                  placeholder='Longitud'
                  {...register('longitude', { required: true })}
                />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Descripción</label>
            <textarea
              id='description'
              className='form-control'
              placeholder='Descripción del hotel'
              {...register('description', { required: true })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='images'>Elegir Imagenes</label>
            <input
              type='file'
              id='images'
              name='images'
              onChange={handleImages}
              multiple
              style={{ display: 'none' }}
              // {...register('images', { required: true })}
            />
            <div className='selected-images'>
              {images.map((image, index) => (
                <img src={image} alt='' key={index} />
              ))}
            </div>
          </div>

          <div className='form-group-buttons'>
            <button className='btn btn-primary'>Crear hotel</button>

            <Link to={'/admin/hotels'} className='btn btn-tertiary'>
              Cancelar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateHotel;
