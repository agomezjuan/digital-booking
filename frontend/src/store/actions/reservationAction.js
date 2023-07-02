import { createAsyncThunk } from '@reduxjs/toolkit';

import httpService from '../../util/httpService';

export const getReservations = createAsyncThunk(
  'reservation/getReservations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpService.get('/reservations');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createReservation = createAsyncThunk(
  'reservation/createReservation',
  async (reservation, { rejectWithValue }) => {
    try {
      const response = await httpService.post('/reservations', reservation);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateReservation = createAsyncThunk(
  'reservation/updateReservation',
  async (reservation, { rejectWithValue }) => {
    try {
      const response = await httpService.put(
        `/reservations/${reservation.id}`,
        reservation,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const cancelReservation = createAsyncThunk(
  'reservation/cancelReservation',
  async (reservation, { rejectWithValue }) => {
    try {
      const response = await httpService.put(
        `/reservations/${reservation.id}`,
        reservation,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
