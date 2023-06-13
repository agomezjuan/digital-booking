import PropTypes from 'prop-types';

const Rating = ({ rating }) => {
  const ratingScale = {
    2: 'Muy malo',
    3: 'Malo',
    4: 'Insuficiente',
    5: 'Suficiente',
    6: 'Aceptable',
    7: 'Bueno',
    8: 'Muy bueno',
    9: 'Excelente',
    10: 'Fantástico',
  };
  const ratingText = ratingScale[rating - (rating % 1)];
  return (
    <div>
      <div className='rating'>
        <div className='number'>{rating}</div>
        <span>{ratingText}</span>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
