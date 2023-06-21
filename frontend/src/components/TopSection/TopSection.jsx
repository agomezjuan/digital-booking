import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './TopSection.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const TopSection = ({ hotelName }) => {
  const [params] = useSearchParams();
  const location = useLocation();
  const name = params.get('name') ?? '';
  const { categories } = useSelector((state) => state.category);
  const [category, setCategory] = useState({});

  useEffect(() => {
    setCategory(categories.find((category) => category.name === name));
    document.title = category?.name ?? 'Categoría';
  }, [name, categories]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='top-section'>
      <div className='container'>
        <div className='top-section-title'>
          {location.pathname === '/category' ? (
            <>
              <span>Categoría</span>
              <h2>{name}</h2>
              <p>{category?.description}</p>
            </>
          ) : (
            <>
              <span>Hotel</span>
              <h2>{hotelName}</h2>
            </>
          )}
        </div>
        <div className='top-section-back' onClick={goBack}>
          <ion-icon name='chevron-back-outline'></ion-icon>
        </div>
      </div>
    </div>
  );
};

TopSection.propTypes = {
  hotelName: PropTypes.string,
};

export default TopSection;
