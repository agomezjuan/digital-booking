import { Link } from 'react-router-dom';
import './PackageSection.scss';
import HotelCard from '../HotelCard/HotelCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getHotels } from '../../store/actions/hotelActions';

const PackageSection = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotel);

  console.log(hotels);

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

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
          {hotels.map((hotel, i) => (
            <HotelCard key={i} hotel={hotel} />
          ))}
        </ul>
        <Link to={'/search'} className='all'>
          <button className='btn btn-primary'>VER TODOS LOS HOTELES</button>
        </Link>
      </div>
    </section>
  );
};

export default PackageSection;
