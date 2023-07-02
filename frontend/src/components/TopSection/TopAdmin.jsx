import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './TopSection.scss';

const TopAdmin = () => {
  useEffect(() => {
    document.title = 'Admin';
  }, []);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='top-admin'>
      <div className='container'>
        <div className='top-section-title'>
          <span>Admin Dashboard</span>
        </div>
        <div className='top-section-back' onClick={goBack}>
          <ion-icon name='chevron-back-outline'></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default TopAdmin;
