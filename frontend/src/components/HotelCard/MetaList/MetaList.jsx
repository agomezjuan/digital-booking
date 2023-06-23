import PropTypes from 'prop-types';

const MetaList = ({ location, people, time }) => {
  const { city, country } = location;
  return (
    <ul className='card-meta-list'>
      {time && (
        <li className='card-meta-item'>
          <div className='meta-box'>
            <ion-icon name='time'></ion-icon>
            <p className='text'>{time}</p>
          </div>
        </li>
      )}
      {people && (
        <li className='card-meta-item'>
          <div className='meta-box'>
            <ion-icon name='people'></ion-icon>
            {/* <p className='text'>pax: {people}</p> */}
          </div>
        </li>
      )}
      {location && (
        <li className='card-meta-item'>
          <div className='meta-box'>
            <ion-icon name='location'></ion-icon>
            <p className='text'>
              {city}, {country}
            </p>
          </div>
        </li>
      )}
    </ul>
  );
};

MetaList.propTypes = {
  location: PropTypes.object.isRequired,
  people: PropTypes.number,
  time: PropTypes.string,
};

export default MetaList;
