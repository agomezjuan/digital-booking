import { createSlice } from '@reduxjs/toolkit';
import {
  getReservations,
  createReservation,
  updateReservation,
  cancelReservation,
} from '../actions/reservationAction';

const initialState = {
  reservations: [],
  currentReservation: null,
  status: 'idle',
  people: 0,
  destination: '',
  dates: [],
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setCurrentReservation(state, action) {
      state.currentReservation = action.payload;
    },
    setDates(state, action) {
      state.dates = action.payload;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setPeople(state, action) {
      state.people = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReservations.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.reservations = payload;
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReservation.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload.message;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateReservation.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload;
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(cancelReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelReservation.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload;
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentReservation, setDates, setDestination, setPeople } =
  reservationSlice.actions;

export default reservationSlice.reducer;
