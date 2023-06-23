import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { SidebarContext } from '../../../contexts/SidebarContext';

const Sidebar = () => {
  const [isMenuOpen] = useContext(SidebarContext);
  return (
    <div className={`wrapper ${isMenuOpen ? 'open' : ''}`}>
      <div className='admin-sidebar'>
        <ul className='admin-sidebar-list'>
          <li className='admin-sidebar-item'>
            <NavLink to='/admin/dashboard' className='admin-sidebar-link'>
              <ion-icon name='grid'></ion-icon>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className='admin-sidebar-item'>
            <NavLink to='/admin/users' className={'admin-sidebar-link'}>
              <ion-icon name='person'></ion-icon>
              <span>Usuarios</span>
            </NavLink>
          </li>
          <li className='admin-sidebar-item'>
            <NavLink to='/admin/categories' className='admin-sidebar-link'>
              <ion-icon name='albums'></ion-icon>
              <span>Categorías</span>
            </NavLink>
          </li>
          <li className='admin-sidebar-item'>
            <NavLink to='/admin/hotels' className='admin-sidebar-link'>
              <ion-icon name='home'></ion-icon>
              <span>Hoteles</span>
            </NavLink>
          </li>
          <li className='admin-sidebar-item'>
            <NavLink to='/admin/rooms' className='admin-sidebar-link'>
              <ion-icon name='bed'></ion-icon>
              <span>Habitaciones</span>
            </NavLink>
          </li>
          <li className='admin-sidebar-item'>
            <NavLink to='/admin/bookings' className='admin-sidebar-link'>
              <ion-icon name='bookmark'></ion-icon>
              <span>Reservas</span>
            </NavLink>
          </li>
          <li className='admin-sidebar-item'>
            <NavLink to='/admin/reviews' className='admin-sidebar-link'>
              <ion-icon name='star'></ion-icon>
              <span>Reseñas</span>
            </NavLink>
          </li>
          <li className='admin-sidebar-item'>
            <NavLink to='/admin/support' className='admin-sidebar-link'>
              <ion-icon name='help-outline'></ion-icon>
              <span>Soporte</span>
            </NavLink>
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
    </div>
  );
};

export default Sidebar;
