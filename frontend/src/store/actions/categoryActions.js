import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../util/httpService';

/**
 * Get categories
 */
export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.get('/categories');
      console.log('Data categorias', data);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

/**
 * Get category by id
 */
export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/categories/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Create category
 */
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (category, { dispatch, rejectWithValue }) => {
    try {
      console.log('Ejecutando createCategory');
      const { data } = await http.post('/categories', category, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(getCategories());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Update category
 */
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ category, id }, { dispatch, rejectWithValue }) => {
    try {
      console.log('Ejecutando updateCategory');
      const { data } = await http.put(`/categories/${id}`, category, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(getCategories());
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Delete category
 */
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await http.delete(`/categories/${id}`);
      dispatch(getCategories());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
