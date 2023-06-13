import { useSearchParams } from 'react-router-dom';
import { Header, TopSection, Footer, HotelCard, LinkButton } from '..';
import { hotels } from '../../mocks/hotels';
import './CategoryFilter.scss';
import { useEffect, useState } from 'react';

const CategoryFilter = () => {
  const [availableHotels, setAvailableHotels] = useState([]);
  const [params] = useSearchParams();
  const name = params.get('name') ?? '';

  const categoryExists = categoryNames().includes(name);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAvailableHotels(hotels.filter((hotel) => hotel.category === name));
  }, [name]);

  function categoryNames() {
    const categories = [];
    hotels.forEach((hotel) => {
      if (!categories.includes(hotel.category)) {
        categories.push(hotel.category);
      }
    });
    return categories;
  }

  return (
    <>
      <Header />
      <TopSection />
      {!categoryExists ? (
        <div className='no-category'>
          <ion-icon name='alert-circle-outline'></ion-icon>
          <span>
            No se encontraron hoteles para la categoría <b>{name}</b>
          </span>
          <div>
            <LinkButton link='/' text='Volver a Home' primary />
          </div>
        </div>
      ) : (
        <section className='package'>
          <div className='container'>
            <ul className='package-list'>
              {availableHotels
                .filter((hotel) => hotel.category === name)
                .map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </ul>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default CategoryFilter;
