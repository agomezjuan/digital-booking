import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { deleteHotel, getHotels } from '../../../store/actions/hotelActions';
import Swal from 'sweetalert2';

const Hotels = () => {
  const [search, setSearch] = useState('');
  const { hotels } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();
  const location = useLocation();
  const isMainPage = location.pathname == '/admin/hotels';

  useEffect(() => {
    document.title = 'Hoteles';
    dispatch(getHotels());
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleFilter = (hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.description.toLowerCase().includes(search.toLowerCase());

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteHotel(id)).then(({ payload }) => {
          Swal.fire({
            icon: 'success',
            text: payload,
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  return (
    <>
      <h2>Hoteles</h2>
      {isMainPage ? (
        <>
          <div className='admin-content-header'>
            <div className='admin-content-header-search'>
              <ion-icon name='search-outline'></ion-icon>
              <input type='text' placeholder='Buscar' onChange={handleSearch} />

              <div className='admin-content-header-search-filter'>
                <ion-icon name='chevron-down-outline'></ion-icon>
              </div>
            </div>
            <div className='admin-content-header-actions'>
              <Link to='/admin/hotels/create' className='btn btn-primary'>
                <ion-icon name='add-outline'></ion-icon>
                <span>Crear</span>
              </Link>
            </div>
          </div>
          <div className='admin-content-hotel'>
            <div className='admin-content-hotel-block'>
              {hotels?.filter(handleFilter).map((hotel) => (
                <div key={hotel?.id} className='admin-content-hotel-card'>
                  <div className='admin-content-hotel-card-image'>
                    <img src={hotel?.images[2]} alt='' />
                  </div>
                  <div className='admin-content-hotel-card-info'>
                    <div className='admin-content-hotel-card-info-name'>
                      <h3>{hotel?.name}</h3>
                    </div>
                    <div className='admin-content-hotel-card-info-description'>
                      <p>{hotel?.description}</p>
                    </div>
                    <div className='admin-content-hotel-card-info-actions'>
                      <Link to={`/admin/hotels/${hotel?.id}/edit`}>
                        <ion-icon name='create'></ion-icon>
                      </Link>
                      <Link
                        className='trash'
                        onClick={() => handleDelete(hotel?.id)}
                      >
                        <ion-icon name='trash'></ion-icon>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Hotels;
