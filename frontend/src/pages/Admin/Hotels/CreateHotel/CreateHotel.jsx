import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getReverseGeocodingData } from '../../../../util/reverseGeocoding';
import Swal from 'sweetalert2';
import './CreateHotel.scss';
import MultiSelectChips from '../../../../components/MultiSelectChips/MultiSelectChips';
import { policies } from '../../../../mocks/policies';
import { createHotel } from '../../../../store/actions/hotelActions';
import { getCategories } from '../../../../store/actions/categoryActions';
import { getFeatures } from '../../../../store/actions/featureActions';
import { Spinner } from '../../../../components';

const CreateHotel = () => {
  // Inicializar los hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const { categories } = useSelector((state) => state.category);
  const { features } = useSelector((state) => state.feature);
  const { status } = useSelector((state) => state.hotel);

  useEffect(() => {
    // Obtener las categorías
    categories.length === 0 ? dispatch(getCategories()) : null;
    features.length === 0 ? dispatch(getFeatures()) : null;
  }, [dispatch, categories, features]);

  const loading = status === 'loading';

  const mapDiv = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      street: '', // Address
      number: '', // Address
      state: '', // Address
      zipcode: '', // Address
      city: '', // Address
      country: '', // Address
      longitude: -57.98310726304649, // Address
      latitude: -34.80738384249134, // Address
      phone: '',
      email: '',
      features: [],
      description: '',
      adultPrice: '',
      childPrice: '',
      imgFiles: [],
      rules: '',
      security: '',
      cancellation: '',
    },
  });

  const onSubmit = (data) => {
    const hotel = {
      name: data.name,
      category: data.category,
      street: data.street,
      number: data.number,
      city: data.city,
      state: data.state,
      country: data.country,
      zipcode: data.zipcode,
      longitude: data.longitude,
      latitude: data.latitude,
      phone: data.phone,
      email: data.email,
      features: data.features,
      description: data.description,
      adultPrice: data.adultPrice,
      childPrice: data.childPrice,
      rules: data.rules,
      security: data.security,
      cancellation: data.cancellation,
    };

    const formData = new FormData();

    formData.append('data', JSON.stringify(hotel));
    formData.append('images', imgFiles);

    for (let i = 0; i < imgFiles.length; i++) {
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${imgFiles[i].name}`;
      formData.append('images', imgFiles[i], fileName);
    }

    console.log('hotel', hotel);

    try {
      dispatch(createHotel({ hotel: formData })).then(({ payload }) => {
        if (payload == 'Error guardando el hotel') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: payload,
          });
          return;
        }
        Swal.fire({
          icon: 'success',
          title: payload,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate('/admin/hotels');
      });
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    // Mapbox. Creacion del mapa
    const map = new Map({
      container: mapDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-57.98310726304649, -34.80738384249134],
      zoom: 14,
      navigationControl: true,
    });

    // Nombre del hotel, para mostrar en el popup.
    // Está siendo tomado desde el formulario
    const name = getValues('name');

    // Creación del popup. Mostrará el nombre del hotel
    const myPopup = new Popup({ offset: 25 }).setHTML(`<h4>${name}</h4>`);
    // Creación del marcador
    const marker = new Marker({ color: '#41add8', draggable: true })
      .setLngLat([-57.98310726304649, -34.80738384249134])
      .setPopup(myPopup)
      .addTo(map);

    // Eventos del mapa
    // Al hacer click en el mapa, se obtienen los datos de la dirección
    map.on('click', (e) => reverseGeocode(e, marker, map));
    map.on('dragend', (e) => reverseGeocode(e, marker, map));

    return () => {
      // Al desmontar el componente, se remueven el mapa y el marcador
      map.remove();
      marker.remove();
    };
  }, [mapDiv, getValues]);

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

    // Setear los valores de las coordenadas en el formulario
    setValue('longitude', coordinates.lng);
    setValue('latitude', coordinates.lat);
    const { country, city, street, number, state, postalCode } =
      await getReverseGeocodingData(coordinates);

    // Setear los valores en el formulario
    setValue('country', country);
    setValue('city', city);
    setValue('street', street);
    setValue('number', number);
    setValue('state', state);
    setValue('zipcode', postalCode);
  }

  const handleImages = (e) => {
    const files = e.target.files;

    setImgFiles(files);

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

  const chooseStandardPolicies = () => {
    setValue('rules', policies.rules);
    setValue('security', policies.security);
    setValue('cancellation', policies.cancellation);
  };

  return (
    <>
      {loading ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <Spinner />
          </div>
        </>
      ) : (
        <>
          <div className='create-hotel'>
            <h3>Crear hotel</h3>

            <form
              className='create-hotel-form'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='create-hotel-map'>
                <div ref={mapDiv}></div>
              </div>
              <div className='hotel-form-container'>
                {/* Nombre del hotel */}
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
                    <span className='text-danger'>
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
                {/* Categoría */}
                <div className='form-group'>
                  <label htmlFor='category'>Categoría</label>
                  <select
                    id='category'
                    className='form-control'
                    {...register('category', { required: true })}
                  >
                    <option value=''>Selecciona una categoría</option>
                    {categories.map((category) => (
                      <option value={category.name} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Dirección bloque calle */}
                <div className='form-group'>
                  <label htmlFor='street'>Dirección</label>
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
                    {/* Dirección bloque numero */}
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
                  {/* Dirección bloque ciudad */}
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
                    {/* Dirección bloque código postal */}
                    <div className='form-group-country-city'>
                      <input
                        type='text'
                        id='zipcode'
                        className='form-control'
                        placeholder='Código Postal'
                        {...register('zipcode', { required: true })}
                      />
                    </div>
                  </div>
                  {/* Dirección bloque estado/provincia */}
                  <div className='form-group-country'>
                    <div className='form-group-country-city'>
                      <input
                        type='text'
                        id='state'
                        className='form-control'
                        placeholder='Estado/Provincia'
                        {...register('state', { required: true })}
                      />
                    </div>
                    {/* Dirección bloque país */}
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
                {/* Coordenadas */}
                <div className='form-group'>
                  <label htmlFor='latitude'>Coordenadas</label>
                  <div className='form-group-coordinates'>
                    {/* Latitud */}
                    <div className='form-group-coordinates-latitude'>
                      <input
                        type='text'
                        id='latitude'
                        className='form-control'
                        placeholder='Latitud'
                        {...register('latitude', { required: true })}
                      />
                    </div>
                    {/* Longitud */}
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
                {/* Descripción */}
                <div className='form-group'>
                  <label htmlFor='description'>Descripción</label>
                  <textarea
                    id='description'
                    className='form-control'
                    placeholder='Descripción del hotel'
                    {...register('description', {
                      required: true,
                      maxLength: 1000,
                    })}
                  />
                </div>
                {/* Características */}
                <div className='form-group'>
                  <label htmlFor='features'>Características</label>
                  <MultiSelectChips
                    name={'features'}
                    control={control}
                    options={features}
                  />
                </div>
                {/* Precios */}
                <div className='form-group'>
                  <label htmlFor='adult-price'>Precios ($)</label>
                  <div className='form-group-prices'>
                    {/* Precio adultos */}
                    <div className='form-group-prices-adults'>
                      <input
                        type='text'
                        id='adult-price'
                        className='form-control'
                        placeholder='Adultos'
                        {...register('adultPrice', { required: true })}
                      />
                    </div>
                    {/* Precio niños */}
                    <div className='form-group-prices-children'>
                      <input
                        type='text'
                        id='children-price'
                        className='form-control'
                        placeholder='Niños'
                        {...register('childPrice', { required: true })}
                      />
                    </div>
                  </div>
                </div>

                {/* Imágenes */}
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

                {/* Políticas */}

                <div className='form-group'>
                  <label htmlFor='policies'>
                    Políticas{' '}
                    <span onClick={chooseStandardPolicies}>
                      Elegir política estándar de Digital Booking
                    </span>
                  </label>
                  <textarea
                    id='rules'
                    className='form-control'
                    placeholder='Normas del hotel'
                    {...register('rules', { required: true })}
                  />
                  <textarea
                    id='security'
                    className='form-control'
                    placeholder='Politicás de seguridad'
                    {...register('security', { required: true })}
                  />
                  <textarea
                    id='cancelation'
                    className='form-control'
                    placeholder='Política de cancelación'
                    {...register('cancellation', { required: true })}
                  />
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
        </>
      )}
    </>
  );
};

export default CreateHotel;
