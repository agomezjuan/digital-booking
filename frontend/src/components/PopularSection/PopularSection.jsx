import CategoryCard from '../CategoryCard/CategoryCard';
import popular1 from '../../assets/images/popular-1.jpg';
import popular2 from '../../assets/images/popular-2.jpg';
import popular3 from '../../assets/images/popular-3.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../store/actions/categoryActions';

const catgImg = [popular1, popular2, popular3, popular1, popular2];

const PopularSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    console.log(categories);
    if (categories.length === 0) dispatch(getCategories());
  }, [categories]);

  return (
    <section className='popular' id='destination'>
      <div className='container'>
        <p className='section-subtitle'>Categorías</p>
        <h2 className='h2 section-title'>Categorías Populares</h2>
        <p className='section-text'>
          Descubre destinos icónicos en nuestros hospedajes estéticos e
          increíbles. Sumérgete en la belleza de lugares únicos y experimenta
          una estadía inolvidable. Desde cabañas enclavadas en bosques mágicos
          hasta casas flotantes en lagos pintorescos, encuentra tu escapada
          perfecta en los destinos más populares. ¡Déjate cautivar por la magia
          de estos lugares excepcionales!
        </p>
        <ul className='popular-list'>
          {categories.map((category, index) => (
            <li key={category.id}>
              <CategoryCard img={catgImg[index]} category={category} />
            </li>
          ))}
        </ul>
        {/* <button className='btn btn-primary'>Más Destinos</button> */}
      </div>
    </section>
  );
};

export default PopularSection;
