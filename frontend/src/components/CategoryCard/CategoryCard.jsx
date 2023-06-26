import PropTypes from 'prop-types';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const CategoryCard = ({ img, category }) => {
  const { name, description } = category;
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSearchCategory = () => {
    navigate('/category');
    setParams({ ...params, name: name });
  };

  let images = document.querySelectorAll('.skeleton');
  images.forEach((image) => {
    image.addEventListener('load', () => {
      image.classList.remove('skeleton');
    });
  });

  return (
    <div className='popular-card' onClick={handleSearchCategory}>
      <figure className='card-img'>
        <img src={img} alt={name} loading='lazy' className='skeleton' />
      </figure>
      <div className='card-content'>
        <div className='card-rating'>
          <ion-icon name='star'></ion-icon>
          <ion-icon name='star'></ion-icon>
          <ion-icon name='star'></ion-icon>
          <ion-icon name='star'></ion-icon>
          <ion-icon name='star'></ion-icon>
        </div>
        <p className='card-subtitle'>
          <Link to='/'>{name}</Link>
        </p>
        <h3 className='h3 card-title'>
          <Link to='/'>{name}</Link>
        </h3>
        <p className='card-text'>{description}</p>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired,
  img: PropTypes.string.isRequired,
};

export default CategoryCard;
