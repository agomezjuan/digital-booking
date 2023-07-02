import { Link } from 'react-router-dom';

import './Dashboard.scss';

const Dashboard = () => {
  return (
    <>
      <div className='admin-statistics'>
        <div className='admin-statistics-card'>
          <div className='admin-statistics-card-header'>
            <h3>Usuarios</h3>
            <Link
              to='/admin/users'
              className='admin-statistics-card-header-link'
            >
              <span>Ver todos</span>
              <ion-icon name='chevron-forward-outline'></ion-icon>
            </Link>
          </div>
        </div>
        <div className='admin-statistics-card'>
          <div className='admin-statistics-card-header'>
            <h3>Hoteles</h3>
            <Link
              to='/admin/users'
              className='admin-statistics-card-header-link'
            >
              <span>Ver todos</span>
              <ion-icon name='chevron-forward-outline'></ion-icon>
            </Link>
          </div>
        </div>
        <div className='admin-statistics-card'>
          <div className='admin-statistics-card-icon'>
            <ion-icon name='receipt-outline'></ion-icon>
          </div>
          <div className='admin-statistics-card-info'>
            <h3>Reservas</h3>
            <Link
              to='/admin/users'
              className='admin-statistics-card-header-link'
            >
              <span>Ver todos</span>
              <ion-icon name='chevron-forward-outline'></ion-icon>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
