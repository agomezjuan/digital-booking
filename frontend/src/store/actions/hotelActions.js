import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../util/httpService';

/**
 * Get all hotels
 */
export const getHotels = createAsyncThunk(
  'hotel/getHotels',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.get('/hotels');
      console.log('Data hoteles', data);
      return data.hotels;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

/**
 * Get hotel by id
 * @param {string} id
 * @returns {Promise}
 * @throws {Error}
 */
export const getHotel = createAsyncThunk(
  'hotel/getHotel',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/hotels/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Create hotel
 * @param {Object} hotel
 * @returns {Promise}
 * @throws {Error}
 */
export const createHotel = createAsyncThunk(
  'hotel/createHotel',
  async ({ hotel }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await http.post('/hotels', hotel, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(getHotels());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Update hotel
 * @param {string} id
 * @param {Object} hotel
 * @returns {Promise}
 */
export const updateHotel = createAsyncThunk(
  'hotel/updateHotel',
  async ({ id, hotel }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await http.put(`/hotels/${id}`, hotel, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(getHotels());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
