import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../store/actions/categoryActions';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Usuarios';
    dispatch(getCategories());
  }, []);

  return (
    <>
      <h2>Categorías</h2>
      <div className='admin-content-header'>
        <div className='admin-content-header-search'>
          <ion-icon name='search-outline'></ion-icon>
          <input type='text' placeholder='Buscar' />

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
      <div className='admin-content-category-block'>
        {categories.map((category) => (
          <div key={category._id}>
            <div>
              <img src={category.image} alt={category.name} />
            </div>
            <div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
