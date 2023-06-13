import { Link, Outlet } from 'react-router-dom';
import { Header } from '../../../components';
import '../Admin.scss';

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <div className='admin'>
        <div className='admin-container'>
          <div className='admin-wrapper'>
            <div className='admin-sidebar'>
              <ul className='admin-sidebar-list'>
                <li className='admin-sidebar-item'>
                  <Link to='/admin/dashboard' className='admin-sidebar-link'>
                    <ion-icon name='grid'></ion-icon>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className='admin-sidebar-item'>
                  <Link to='/admin/users' className='admin-sidebar-link'>
                    <ion-icon name='person'></ion-icon>
                    <span>Usuarios</span>
                  </Link>
                </li>
                <li className='admin-sidebar-item'>
                  <Link to='/admin/categories' className='admin-sidebar-link'>
                    <ion-icon name='albums'></ion-icon>
                    <span>Categorías</span>
                  </Link>
                </li>
                <li className='admin-sidebar-item'>
                  <Link to='/admin/hotels' className='admin-sidebar-link'>
                    <ion-icon name='home'></ion-icon>
                    <span>Hoteles</span>
                  </Link>
                </li>
                <li className='admin-sidebar-item'>
                  <Link to='/admin/rooms' className='admin-sidebar-link'>
                    <ion-icon name='bed'></ion-icon>
                    <span>Habitaciones</span>
                  </Link>
                </li>
                <li className='admin-sidebar-item'>
                  <Link to='/admin/bookings' className='admin-sidebar-link'>
                    <ion-icon name='bookmark'></ion-icon>
                    <span>Reservas</span>
                  </Link>
                </li>
                <li className='admin-sidebar-item'>
                  <Link to='/admin/reviews' className='admin-sidebar-link'>
                    <ion-icon name='star'></ion-icon>
                    <span>Reseñas</span>
                  </Link>
                </li>
                <li className='admin-sidebar-item'>
                  <Link to='/admin/support' className='admin-sidebar-link'>
                    <ion-icon name='help-outline'></ion-icon>
                    <span>Soporte</span>
                  </Link>
                </li>
              </ul>

              <div className='admin-sidebar-footer'>
                <div className='admin-sidebar-brand'>
                  <div className='admin-sidebar-brand-icon'>
                    <ion-icon name='globe-outline'></ion-icon>
                  </div>
                  <span>Digital Booking</span>
                </div>
              </div>
            </div>
            <div className='admin-content'>
              <Outlet />
              {/* <div className='admin-content-main'>
                <div className='admin-content-main-card'>
                  <div className='admin-content-main-card-header'>
                    <h3>Usuarios</h3>
                    <Link
                      to='/admin/users'
                      className='admin-content-main-card-header-link'>
                      <span>Ver todos</span>
                      <ion-icon name='chevron-forward-outline'></ion-icon>
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
