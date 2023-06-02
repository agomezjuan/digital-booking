import { createAsyncThunk } from '@reduxjs/toolkit';

import http from '../../util/httpService';

/**
 * Register
 * @param {Object} data user data
 */
export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post('/auth/register', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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

      dispatch(getMe(token));

      const role = roles[0].authority;

      return { role, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
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

      const { user } = data;

      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
