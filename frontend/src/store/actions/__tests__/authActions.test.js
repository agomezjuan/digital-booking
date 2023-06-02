import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

import MockAdapter from 'axios-mock-adapter';
import { register, login } from '../authActions';
import http from '../../../util/httpService';

// Crea una instancia de MockAdapter para simular peticiones HTTP con axios
const mockAxios = new MockAdapter(http);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

describe('authActions', () => {
  // Configura el mock de httpService antes de cada prueba
  beforeEach(() => {
    mockAxios.reset(); // Restablece cualquier configuración anterior del mock

    // Respuesta simulada para una petición POST exitosa
    mockAxios.onPost('/auth/register').reply(200, {
      data: {
        id: 1,
        name: 'John Doe',
        email: 'john@test.com',
        createdAt: '2023-05-31',
      },
    });

    // Responde con un error 500 para simular un error en el servidor
    mockAxios
      .onPost('/auth/register')
      .reply(500, { error: 'Error de registro' });
  });

  // ... Pruebas unitarias para las funciones register, login, getMe

  test('register', async () => {
    const dispatch = (action) => {
      // Simplemente registra las acciones despachadas
      console.log('Action dispatched:', action);
    };
    const getState = () => ({});
    const thunk = register({
      name: 'John Doe',
      email: 'john@test.com',
      password: '123456',
    });

    await thunk(dispatch, getState, {});

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/register/pending' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/register/fulfilled' });

    // ... Comprueba que el estado de la aplicación es el esperado
  });

  test('register error', async () => {
    const dispatch = vi.spyOn('dispatch');
    const getState = () => ({});

    const thunk = register({
      name: 'John Doe',
      email: 'john@test.com',
      password: '123456',
    });

    await thunk(dispatch, getState, {});

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/register/pending' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/register/rejected' });

    // ... Comprueba que el estado de la aplicación es el esperado
  });

  test('login', async () => {
    const dispatch = (action) => {
      // Simplemente registra las acciones despachadas
      console.log('Action dispatched:', action);
    };
    const getState = () => ({});
    const thunk = login({
      email: 'john@test.com',
      password: '123456',
    });

    await thunk(dispatch, getState, {});

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/login/pending' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/login/fulfilled' });

    // ... Comprueba que el estado de la aplicación es el esperado
  });

  test('login error', async () => {
    const dispatch = (action) => {
      // Simplemente registra las acciones despachadas
      console.log('Action dispatched:', action);
    };
    const getState = () => ({});
    const thunk = login({
      email: 'john@test.com',
      password: '123456',
    });

    await thunk(dispatch, getState, {});

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/login/pending' });
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/login/rejected' });

    // ... Comprueba que el estado de la aplicación es el esperado
  });
});
