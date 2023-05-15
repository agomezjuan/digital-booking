import { describe, test, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

import Footer from './Footer.jsx';

describe('Componente Footer', () => {
  let container;
  let getByText;
  beforeEach(() => {
    ({ container, getByText } = render(<Footer />));
  });

  test('se visualiza correctamente', () => {
    // Act
    const footer = container.querySelector('footer');

    // Assert
    expect(footer).toBeDefined();
    expect(footer).toHaveClass('footer');
  });

  test('contiene un logotipo', () => {
    // Act
    const logo = container.querySelector('.logo');

    // Assert
    expect(logo).toBeDefined();
    expect(logo).toHaveClass('logo');
  });

  test('contiene un formulario de contacto', () => {
    // Act
    const form = container.querySelector('.footer-form');

    // Assert
    expect(form).toBeDefined();
    expect(form).toHaveClass('footer-form');
  });

  test('tiene un copyrigth', () => {
    // Act
    const copyrigth = container.querySelector('.copyrigth');
    const copyText = getByText(/Reservados todos los derechos/i);

    // Assert
    expect(copyrigth).toBeDefined();
    expect(copyText).toBeInTheDocument();
  });
});
