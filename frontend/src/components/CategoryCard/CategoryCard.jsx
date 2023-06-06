import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ img, category }) => {
  const { name, description } = category;
  return (
    <div className='popular-card'>
      <figure className='card-img'>
        <img src={img} alt={name} loading='lazy' />
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
