import { describe, test, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import Header from './Header.jsx';
import logoSrc from '../../assets/images/logo-blue.png';

/**
 * Test: Header
 */
describe('Header', () => {
  // Arrange
  const { container } = render(<Header />);
  const header = container.querySelector('.header');
  const logo = container.querySelector('.logo');

  test('contiene el logotipo y el lema de la empresa', () => {
    // Act
    const logoImg = logo.querySelector('img');

    // Assert
    expect(logo).toHaveClass('logo');
    expect(logoImg).toHaveAttribute('alt', 'Hospic logo');
    expect(logoImg).toHaveAttribute('src', logoSrc);
  });

  test('hacer clic en el logotipo o lema, redirige a la página principal', () => {
    // Act
    fireEvent.click(logo);

    // Assert
    expect(logo).toHaveAttribute('href', '#');
    expect(window.location.pathname).toBe('/');
  });

  test('contiene dos botones: “Crear cuenta” e “Iniciar sesión”', () => {
    // Arrange
    const headerBtnGroup = header.querySelector('.header-btn-group');
    const createAccountBtn = headerBtnGroup.querySelector(
      '.create-account-btn',
    );
    const loginBtn = headerBtnGroup.querySelector('.login-btn');

    // Assert
    expect(createAccountBtn).toHaveTextContent('Crear cuenta');
    expect(loginBtn).toHaveClass('login-btn');
    expect(loginBtn).toHaveTextContent('Iniciar sesión');
  });
});
