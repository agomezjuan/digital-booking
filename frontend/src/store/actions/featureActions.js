import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../util/httpService';

/**
 * Get features
 */
export const getFeatures = createAsyncThunk(
  'feature/getFeatures',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.get('/features');
      console.log('Data features', data);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

/**
 * Get feature by id
 */
export const getFeature = createAsyncThunk(
  'feature/getFeature',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/features/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Create feature
 * @param {Object} feature
 */
export const createFeature = createAsyncThunk(
  'feature/createFeature',
  async (feature, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await http.post('/features', feature);
      dispatch(getFeatures());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Update feature
 * @param {Object} feature
 * @param {string} id
 */
export const updateFeature = createAsyncThunk(
  'feature/updateFeature',
  async ({ feature, id }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await http.put(`/features/${id}`, feature);
      dispatch(getFeatures());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Delete feature
 * @param {string} id
 */
export const deleteFeature = createAsyncThunk(
  'feature/deleteFeature',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await http.delete(`/features/${id}`);
      dispatch(getFeatures());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
