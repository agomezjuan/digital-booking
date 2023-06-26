import { useSearchParams } from 'react-router-dom';
import { Header, TopSection, Footer, HotelCard, LinkButton } from '..';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './CategoryFilter.scss';

const CategoryFilter = () => {
  const [availableHotels, setAvailableHotels] = useState([]);
  const [params] = useSearchParams();
  const name = params.get('name') ?? '';

  const { categories } = useSelector((state) => state.category);
  const { hotels } = useSelector((state) => state.hotel);

  const categoryExists = categories.some((category) => category.name === name);
  const category = categories.find((category) => category.name === name);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAvailableHotels(
      hotels.filter((hotel) => hotel.categoryId === category.id),
    );
  }, [name]);

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
              {availableHotels.map((hotel) => (
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
