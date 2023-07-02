import CategoryCard from '../CategoryCard/CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCategories } from '../../store/actions/categoryActions';

const PopularSection = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.category);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (categories.length === 0 && status === 'idle') dispatch(getCategories());
    if (status === 'failed') setApiError(true);
  }, [categories, status, dispatch]);

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
        {apiError ? (
          <p style={{ textAlign: 'center', color: 'red' }}>
            Las categorias no están disponibles
          </p>
        ) : (
          <ul className='popular-list'>
            {categories.map((category, index) => (
              <li key={index}>
                <CategoryCard img={category.imageUrl} category={category} />
              </li>
            ))}
          </ul>
        )}
        {/* <button className='btn btn-primary'>Más Destinos</button> */}
      </div>
    </section>
  );
};

export default PopularSection;
