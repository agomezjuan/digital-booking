import { Link, Outlet } from 'react-router-dom';

const Hotels = () => {
  return (
    <>
      <h2>Hoteles</h2>
      <div className='admin-content-header'>
        <div className='admin-content-header-search'>
          <ion-icon name='search-outline'></ion-icon>
          <input type='text' placeholder='Buscar' />

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
      <div className='admin-content-body'>
        <Outlet />
      </div>
    </>
  );
};

export default Hotels;
