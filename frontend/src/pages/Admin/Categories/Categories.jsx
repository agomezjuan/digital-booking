import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategory,
  getCategories,
} from '../../../store/actions/categoryActions';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Categories = () => {
  const [search, setSearch] = useState('');
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const location = useLocation();
  const isMainPage = location.pathname == '/admin/categories';

  useEffect(() => {
    document.title = 'Usuarios';
    dispatch(getCategories());
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleFilter = (category) =>
    category.name.toLowerCase().includes(search.toLowerCase()) ||
    category.description.toLowerCase().includes(search.toLowerCase());

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
        dispatch(deleteCategory(id)).then(({ payload }) => {
          Swal.fire({
            icon: 'success',
            title: payload,
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  return (
    <>
      <h2>Categorías</h2>
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
              <Link to='/admin/categories/create' className='btn btn-primary'>
                <ion-icon name='add-outline'></ion-icon>
                <span>Crear</span>
              </Link>
            </div>
          </div>
          <div className='admin-content-category-block'>
            {categories.filter(handleFilter).map((category) => (
              <div key={category.id} className='category-card'>
                <div className='category-card-image'>
                  <img
                    src={category.imageUrl || 'http://unsplash.it/300/300/'}
                    alt={category.name}
                  />
                </div>
                <div className='category-card-info'>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <div className='admin-content-category-block-actions'>
                  <Link to={`/admin/categories/${category.id}/edit`}>
                    <ion-icon name='create'></ion-icon>
                  </Link>
                  <Link
                    className='trash'
                    to={''}
                    onClick={() => handleDelete(category.id)}
                  >
                    <ion-icon name='trash'></ion-icon>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Categories;
