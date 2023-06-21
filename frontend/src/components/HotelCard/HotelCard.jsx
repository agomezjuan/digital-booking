import PropTypes from 'prop-types';
import Stars from './Stars/Stars';
import Rating from './Rating/Rating';
import LinkButton from '../LinkButton/LinkButton';
import MetaList from './MetaList/MetaList';
import './HotelCard.scss';
import Favorite from './Favorite/Favorite';

const HotelCard = ({ hotel }) => {
  const { id, name, description, image, rating, location } = hotel;
  return (
    <li>
      <div className='package-card'>
        <figure className='card-banner'>
          <img src={image} alt={name} loading='lazy' />
          <Favorite />
        </figure>
        <div className='card-content'>
          <div className='card-content-header'>
            <div>
              <Stars rating={rating} />
              <h3 className='h3 card-title'>{name}</h3>
            </div>
            <div className='rating'>
              <Rating rating={rating} />
            </div>
          </div>
          <MetaList location={location} time={'3N/2D'} />
          <p className='card-text'>{description}</p>

          <LinkButton link={`/hotel/${id}`} text='Ver más' primary />
        </div>
        {/* <div className='card-price'>
                <div className='wrapper'>
                  <p className='reviews'>(40 reseñas)</p>
                  <div className='card-rating'>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                    <ion-icon name='star'></ion-icon>
                  </div>
                </div>
                <p className='price'>
                  COP 1.649.344
                  <span>/ por persona</span>
                </p>
                <button className='btn btn-secondary'>RESERVA AHORA</button>
              </div> */}
      </div>
    </li>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.object.isRequired,
};

export default HotelCard;
