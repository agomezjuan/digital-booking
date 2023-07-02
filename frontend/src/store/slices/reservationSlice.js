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
  people: 1,
  destination: '',
  dates: [],
  diffDays: 1,
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
      // Calcular el numero de dias
      if (action.payload.length < 2) return (state.diffDays = 1);
      // La fecha esta en formato string, hay que convertirla a Date
      const date1 = new Date(action.payload[0]);
      const date2 = new Date(action.payload[1]);
      // Calcular la diferencia en milisegundos
      const diffTime = Math.abs(date2 - date1);
      // Calcular la diferencia en dias
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      state.diffDays = diffDays;
    },
    setDestination(state, action) {
      state.destination = action.payload;
    },
    setPeople(state, action) {
      state.people = action.payload;
    },
    handleMorePeople(state) {
      state.people += 1;
    },
    handleLessPeople(state) {
      if (state.people > 1) {
        state.people -= 1;
      }
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

export const {
  setCurrentReservation,
  setDates,
  setDestination,
  setPeople,
  handleLessPeople,
  handleMorePeople,
} = reservationSlice.actions;

export default reservationSlice.reducer;
