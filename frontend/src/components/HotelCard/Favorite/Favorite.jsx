import { useState } from 'react';

const Favorite = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('is favorite', isFavorite);
  };

  return (
    <div className='favorite' onClick={handleFavorite}>
      {isFavorite ? (
        <ion-icon name='heart'></ion-icon>
      ) : (
        <ion-icon name='heart-outline'></ion-icon>
      )}
    </div>
  );
};

export default Favorite;
