import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { SidebarContext } from '../../../contexts/SidebarContext';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useContext(SidebarContext);
  const menuItems = [
    {
      name: 'Dashboard',
      icon: 'grid',
      link: '/admin/dashboard',
    },
    {
      name: 'Usuarios',
      icon: 'person',
      link: '/admin/users',
    },
    {
      name: 'Categorías',
      icon: 'albums',
      link: '/admin/categories',
    },
    {
      name: 'Hoteles',
      icon: 'home',
      link: '/admin/hotels',
    },
    {
      name: 'Habitaciones',
      icon: 'bed',
      link: '/admin/rooms',
    },
    {
      name: 'Reservas',
      icon: 'calendar',
      link: '/admin/bookings',
    },
    {
      name: 'Reseñas',
      icon: 'star',
      link: '/admin/reviews',
    },
    {
      name: 'Soporte',
      icon: 'help-circle',
      link: '/admin/support',
    },
  ];

  return (
    <div className={`wrapper ${isMenuOpen ? 'open' : ''}`}>
      <div className='admin-sidebar'>
        <ul className='admin-sidebar-list'>
          {menuItems.map((item, index) => (
            <li className='admin-sidebar-item' key={index}>
              <NavLink
                to={item.link}
                className='admin-sidebar-link'
                onClick={() => setIsMenuOpen(false)}
              >
                <ion-icon name={item.icon}></ion-icon>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
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
