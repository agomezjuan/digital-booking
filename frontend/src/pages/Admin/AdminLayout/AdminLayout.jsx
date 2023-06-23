import { Outlet } from 'react-router-dom';
import { FooterBottom, Header, TopAdmin } from '../../../components';
import '../Admin.scss';
import SidebarProvider from '../../../contexts/SidebarContext';
import SidebarMenu from '../../../components/SidebarMenu/SidebarMenu';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <TopAdmin />
      <div className='admin'>
        <div className='admin-container'>
          <SidebarProvider>
            <div className='admin-wrapper'>
              <SidebarMenu />
              <Sidebar />
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
          </SidebarProvider>
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default AdminLayout;
