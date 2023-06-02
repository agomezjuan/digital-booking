import PropTypes from 'prop-types';

const CategoryCard = ({ title, description, img }) => {
  return (
    <div className='package-card'>
      <figure className='card-banner'>
        <img src={img} alt={title} loading='lazy' />
      </figure>
      <div className='card-content'>
        <h3 className='h3 card-title'>{title}</h3>
        <p className='card-text'>{description}</p>
        <ul className='card-meta-list'>
          <li className='card-meta-item'>
            <div className='meta-box'>
              <ion-icon name='time'></ion-icon>
              <p className='text'>4D/3N</p>
            </div>
          </li>
          <li className='card-meta-item'>
            <div className='meta-box'>
              <ion-icon name='people'></ion-icon>
              <p className='text'>pax: 2</p>
            </div>
          </li>
          <li className='card-meta-item'>
            <div className='meta-box'>
              <ion-icon name='location'></ion-icon>
              <p className='text'>Tailandia</p>
            </div>
          </li>
        </ul>
      </div>
      <div className='card-price'>
        <div className='wrapper'>
          <p className='reviews'>(25 reseñas)</p>
          <div className='card-rating'>
            <ion-icon name='star'></ion-icon>
            <ion-icon name='star'></ion-icon>
            <ion-icon name='star'></ion-icon>
            <ion-icon name='star'></ion-icon>
            <ion-icon name='star'></ion-icon>
          </div>
        </div>
        <p className='price'>
          COP 3.537.390
          <span>/ por persona</span>
        </p>
        <button className='btn btn-secondary'>RESERVAR AHORA</button>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default CategoryCard;
