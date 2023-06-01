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
      const response = await http.post('/auth/login', credentials);

      dispatch(getMe(response.data.token));

      return response.data;
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
      const response = await http.get('/auth/me');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
