import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopResults = () => {
  useEffect(() => {
    document.title = 'Resultados de búsqueda';
  }, []);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='top-admin'>
      <div className='container'>
        <div className='top-section-title'>
          <span>Resultados de búsqueda</span>
        </div>
        <div className='top-section-back' onClick={goBack}>
          <ion-icon name='chevron-back-outline'></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default TopResults;
