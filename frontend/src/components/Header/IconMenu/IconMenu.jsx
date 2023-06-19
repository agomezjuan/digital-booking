import { useState } from 'react';

const IconMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={'bars_menu'}
      onClick={handleClick}
      style={{ position: isMenuOpen && 'fixed' }}
    >
      <span className={`${isMenuOpen && 'line1_bars'}`}></span>
      <span className={`${isMenuOpen && 'line2_bars'}`}></span>
      <span className={`${isMenuOpen && 'line3_bars'}`}></span>
    </div>
  );
};
export default IconMenu;
