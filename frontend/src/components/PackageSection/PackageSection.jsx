import { Link } from 'react-router-dom';
import './PackageSection.scss';
import HotelCard from '../HotelCard/HotelCard';
import { hotels } from '../../mocks/hotels';
import { getRandomHotels } from '../../util/arrayUtils';

const PackageSection = () => {
  return (
    <section className='package' id='package'>
      <div className='container'>
        <p className='section-subtitle'>PAQUETES POPULARES</p>
        <h2 className='h2 section-title'>CONSULTA NUESTROS PAQUETES</h2>
        <p className='section-text'>
          Disfruta de nuestros paquetes con todo incluido, que te brindan
          comodidad y una experiencia completa. Deléitate con un delicioso
          desayuno cada mañana mientras exploras y te relajas en nuestros
          increíbles hospedajes. ¡Déjate consentir y disfruta al máximo sin
          preocupaciones adicionales!
        </p>
        <ul className='package-list'>
          {getRandomHotels(hotels).map((hotel, i) => (
            <HotelCard key={i} hotel={hotel} />
          ))}
        </ul>
        <Link to={'/search'} className='all'>
          <button className='btn btn-primary'>VER TODOS LOS PAQUETES</button>
        </Link>
      </div>
    </section>
  );
};

export default PackageSection;
