import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout/AdminLayout';
import { useEffect } from 'react';

const Admin = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = 'Admin';
    if (pathname === '/admin') {
      navigate('/admin/dashboard');
    }
  }, [pathname, navigate]);
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default Admin;
