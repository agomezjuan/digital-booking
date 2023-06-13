import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../util/httpService';

/**
 * Get users
 */
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.get('/users');
      console.log('Data users', data);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

/**
 * Get user by id
 */
export const getUser = createAsyncThunk(
  'user/getUser',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/users/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Create user
 */
export const createUser = createAsyncThunk(
  'user/createUser',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await http.post('/users', user);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Update user
 */
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await http.put(`/users/${user.id}`, user);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Delete user
 */
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await http.delete(`/users/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
