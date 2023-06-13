import PropTypes from 'prop-types';
import './Stars.scss';
const Stars = ({ rating }) => {
  const value = rating / 2;
  return (
    <div className='stars'>
      {[...Array(5)].fill().map((_, i) => {
        if (value > i) {
          return (
            <span key={i}>
              <ion-icon name='star'></ion-icon>
            </span>
          );
        } else if (value > i - 0.5 && value < i + 0.5) {
          return (
            <span key={i}>
              <ion-icon name='star-half'></ion-icon>
            </span>
          );
        } else {
          return (
            <span key={i}>
              <ion-icon name='star-outline'></ion-icon>
            </span>
          );
        }
      })}
    </div>
  );
};
Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};
export default Stars;
