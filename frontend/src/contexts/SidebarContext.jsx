import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SidebarContext.Provider value={[isMenuOpen, setIsMenuOpen]}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarProvider;
