import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../store/slices/authSlice';

import './UserMenu.scss';
import { useState } from 'react';

const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const isAdmin = role === 'ADMIN';

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClickItem = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className='user' onClick={() => setShowMenu(!showMenu)}>
        <div>
          <p className='slogan'>Hola, {user?.name}</p>
        </div>
        <div className='avatar'>
          <span>
            {user?.name[0]}
            {user?.lastname[0]}
          </span>
        </div>
        {showMenu && (
          <ul className='user-menu' onClick={handleClickItem}>
            {isAdmin && (
              <li className='user-menu-item'>
                <Link to='/admin' className='user-menu-link'>
                  <ion-icon name='grid-outline'></ion-icon>
                  <span>Dashboard</span>
                </Link>
              </li>
            )}
            <li className='user-menu-item'>
              <Link to='/' className='user-menu-link'>
                <ion-icon name='person-outline'></ion-icon>
                <span>Perfil</span>
              </Link>
            </li>
            <li className='user-menu-item'>
              <Link to='/profile' className='user-menu-link'>
                <ion-icon name='heart-outline'></ion-icon>
                <span>Favoritos</span>
              </Link>
            </li>
            <li className='user-menu-item'>
              <Link to='/profile' className='user-menu-link'>
                <ion-icon name='bookmark-outline'></ion-icon>
                <span>Reservas</span>
              </Link>
            </li>
            <li className='user-menu-item'>
              <Link to='/profile' className='user-menu-link'>
                <ion-icon name='settings-outline'></ion-icon>
                <span>Configuración</span>
              </Link>
            </li>
            <li className='user-menu-item logout'>
              <Link to='/' className='user-menu-link' onClick={handleLogout}>
                <ion-icon name='log-out-outline'></ion-icon>
                <span>Cerrar sesión</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default UserMenu;
