import { createAsyncThunk } from '@reduxjs/toolkit';

import http from '../../util/httpService';

/**
 * Register
 * @param {Object} data user data
 */
export const register = createAsyncThunk(
  'auth/register',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await http.post('/auth/register', info);
      console.log('Respuesta Registro', data);
      return data;
    } catch (error) {
      console.log('Error Registro', error);
      return rejectWithValue({
        code: error.response.status,
        message: error.response.data.error,
      });
    }
  },
);

/**
 * Login
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await http.post('/auth/login', credentials);

      const { roles, token } = data;

      sessionStorage.setItem('dhb_token', token);

      dispatch(getMe(token));

      const role = roles[0].authority;

      return { role, token };
    } catch (error) {
      console.log('Error Login', error.response);
      return rejectWithValue({
        code: error.response.status,
        message: error.response.data.error,
      });
    }
  },
);

/**
 * Get me
 * @param {String} token
 */
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (token, { rejectWithValue }) => {
    try {
      http.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { data } = await http.get('/auth/me');

      const user = { ...data?.user, role: undefined };

      return { user, role: data?.user?.role[0] };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Veryfy email
 * @param {String} token
 */
export const verifyUserEmail = createAsyncThunk(
  'auth/verifyUserEmail',
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/auth/verify?token=${token}`);
      console.log('Respuesta Verificacion', data);
      return data.message;
    } catch (error) {
      console.log('Error Verificacion', error.response);
      return rejectWithValue({
        code: error.response.status,
        message: error.response.data.error || error.response.data.message,
      });
    }
  },
);

/**
 * Resend verification email
 */
