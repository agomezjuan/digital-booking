import { useEffect, useState } from 'react';
import { handleFavorite } from '../../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Favorite = ({ id }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsFavorite(favorites?.includes(id));
  }, [favorites]);

  const setFavorites = () => {
    dispatch(handleFavorite(id));
    setIsFavorite(!isFavorite);
    console.log('is favorite', isFavorite);
  };

  return (
    <div className='favorite' onClick={setFavorites}>
      {isFavorite ? (
        <ion-icon name='heart'></ion-icon>
      ) : (
        <ion-icon name='heart-outline'></ion-icon>
      )}
    </div>
  );
};

Favorite.propTypes = {
  id: PropTypes.number,
};

export default Favorite;
