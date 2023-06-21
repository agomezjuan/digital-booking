import './HotelFeatures.scss';
import PropTypes from 'prop-types';
import { features as allFeatures } from '../../mocks/features';

function HotelFeatures({ features }) {
  return (
    <div className='ContainerProductFeatures'>
      <div className='ContainerTitleFeatures'>
        <div className='container'>
          <h2>¿Qué ofrece este lugar?</h2>
        </div>
      </div>
      <div className='container'>
        <div className='ContainerFeaturesAndIcons'>
          {features.map((feature) => {
            const featRender = allFeatures.find((f) => f.name === feature);
            return (
              <div className='hotel-feature' key={featRender.name}>
                <div>
                  <ion-icon name={featRender.icon}></ion-icon>
                  <span>{featRender.name}</span>
                </div>

                <p>{featRender.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

HotelFeatures.propTypes = {
  features: PropTypes.array.isRequired,
};

export default HotelFeatures;
