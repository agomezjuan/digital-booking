import { Link } from 'react-router-dom';
import { Table } from '../../../components';
import { userColumns } from '../../../util/tableColumns';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUsers } from '../../../store/actions/userActions';

const Users = () => {
  const [search, setSearch] = useState('');
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Usuarios';
    dispatch(getUsers());
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleFilter = (user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase());

  return (
    <>
      <h2>Usuarios</h2>
      <div className='admin-content-header'>
        <div className='admin-content-header-search'>
          <ion-icon name='search-outline'></ion-icon>
          <input type='text' placeholder='Buscar' onChange={handleSearch} />

          <div className='admin-content-header-search-filter'>
            <ion-icon name='chevron-down-outline'></ion-icon>
          </div>
        </div>
        <div className='admin-content-header-actions'>
          <Link to='/admin/users/create' className='btn btn-primary'>
            <ion-icon name='add-outline'></ion-icon>
            <span>Crear</span>
          </Link>
        </div>
      </div>
      <div className='admin-content-table' style={{ width: '100%' }}>
        <Table columns={userColumns} data={users?.filter(handleFilter)} />
      </div>
    </>
  );
};

export default Users;
