import { useSelector } from 'react-redux';
import './ProductPolicy.scss';
const ProductPolicy = () => {
  const hotel = useSelector((state) => state.hotel.currentHotel);

  return (
    <div className='policies'>
      <div className='policies-item'>
        <h3>Normas de la casa</h3>
        {hotel?.rules.split('. ').map((parrafo, index) => (
          <p key={index}>{parrafo}</p>
        ))}
      </div>
      <div className='policies-item'>
        <h3>Política de seguridad</h3>
        {hotel?.security.split('.\n').map((parrafo, index) => (
          <p key={index}>{parrafo}</p>
        ))}
      </div>
      <div className='policies-item'>
        <h3>Política de cancelación</h3>
        {hotel?.cancellation.split('.\n').map((parrafo, index) => (
          <p key={index}>{parrafo}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductPolicy;
