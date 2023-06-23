import { useContext } from 'react';
import { SidebarContext } from '../../contexts/SidebarContext';
import './SidebarMenu.scss';
const SidebarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useContext(SidebarContext);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={'bars'} onClick={handleClick}>
      <span className={`${isMenuOpen && 'line1_bars'}`}></span>
      <span className={`${isMenuOpen && 'line2_bars'}`}></span>
      <span className={`${isMenuOpen && 'line3_bars'}`}></span>
    </div>
  );
};
export default SidebarMenu;
