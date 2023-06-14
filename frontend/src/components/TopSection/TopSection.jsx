import { useLocation, useSearchParams } from 'react-router-dom';
import './TopSection.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const TopSection = () => {
  const [params] = useSearchParams();
  const location = useLocation();
  const name = params.get('name') ?? '';
  const { categories } = useSelector((state) => state.category);
  const [category, setCategory] = useState({});

  useEffect(() => {
    setCategory(categories.find((category) => category.name === name));
    document.title = category?.name ?? 'Categoría';
  }, [name, categories]);

  return (
    <div className='top-section'>
      <div className='container'>
        <div className='top-section-title'>
          {location.pathname === '/categories' ? (
            <>
              <span>Categoría</span>
              <h2>{name}</h2>
              <p>{category?.description}</p>
            </>
          ) : (
            <>
              <span>Hotel</span>
              <h2>Almirante</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSection;
