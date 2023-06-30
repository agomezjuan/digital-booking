import { useEffect, useState } from 'react';
import {
  FooterBottom,
  Header,
  HotelCard,
  LinkButton,
  TopResults,
  TourSearch,
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels } from '../store/actions/hotelActions';
import '../components/PackageSection/PackageSection.scss';

function SearchResults() {
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotel);
  const { destination } = useSelector((state) => state.reservation);
  const [availableHotels, setAvailableHotels] = useState([]);

  console.log('availableHotels', availableHotels);

  useEffect(() => {
    document.title = 'Resultados de búsqueda';
    if (hotels?.length === 0) {
      dispatch(getHotels());
    }

    const availableHotels = hotels?.filter(
      (hotel) =>
        hotel?.address.city.includes(destination.split(', ')[0]) ||
        hotel?.address.country.includes(destination.split(', ')[1]),
    );

    setAvailableHotels(availableHotels);
  }, [dispatch, destination, hotels]);

  return (
    <>
      <Header />
      <TopResults />
      <TourSearch />
      {availableHotels?.length === 0 ? (
        <div className='no-category'>
          <ion-icon name='alert-circle-outline'></ion-icon>
          <span>
            No se encontraron hoteles para esta búsqueda <b>{name}</b>
          </span>
          <div>
            <LinkButton link='/' text='Volver a Home' primary />
          </div>
        </div>
      ) : (
        <section className='package'>
          <div className='container'>
            <div className='package-title'>
              <span>Hoteles en {destination}</span>
            </div>
            <ul className='package-list'>
              {availableHotels.map((hotel) => (
                <HotelCard key={hotel?.id} hotel={hotel} />
              ))}
            </ul>
          </div>
        </section>
      )}
      <FooterBottom />
    </>
  );
}

export default SearchResults;
