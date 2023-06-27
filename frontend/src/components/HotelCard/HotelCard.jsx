import PropTypes from 'prop-types';
import Stars from './Stars/Stars';
import Rating from './Rating/Rating';
import LinkButton from '../LinkButton/LinkButton';
import MetaList from './MetaList/MetaList';
import './HotelCard.scss';
import Favorite from './Favorite/Favorite';
import { useEffect } from 'react';

const HotelCard = ({ hotel }) => {
  useEffect(() => {
    var images = document.querySelectorAll('.skeleton');
    images.forEach((image) => {
      image.addEventListener('load', () => {
        image.classList.remove('skeleton');
      });
    });
  }, []);

  return (
    <li>
      <div className='package-card'>
        <figure className='card-banner'>
          <img
            src={hotel?.images[0]}
            alt={hotel?.name}
            loading='lazy'
            className='skeleton'
          />
          <Favorite />
        </figure>
        <div className='card-content'>
          <div className='card-content-header'>
            <div>
              <Stars rating={hotel?.rating} />
              <h3 className='h3 card-title'>{hotel?.name}</h3>
            </div>
            <div className='rating'>
              <Rating rating={hotel?.rating} />
            </div>
          </div>
          <MetaList location={hotel?.address} time={'3N/2D'} />
          <p className='card-text'>{hotel?.description}</p>

          <LinkButton link={`/hotel/${hotel?.id}`} text='Ver más' primary />
        </div>
      </div>
    </li>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.object,
};

export default HotelCard;
