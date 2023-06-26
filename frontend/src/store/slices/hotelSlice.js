import { createSlice } from '@reduxjs/toolkit';
import { createHotel, getHotel, getHotels } from '../actions/hotelActions';

const initialState = {
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  message: '',
  hotels: [],
  currentHotel: null,
};

const hotelSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    resetPlaceError: (state) => {
      state.error = null;
      state.message = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHotel.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createHotel.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload.message;
        state.hotels = payload.hotels;
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getHotels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHotels.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.hotels = payload;
      })
      .addCase(getHotels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getHotel.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHotel.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.currentHotel = payload;
      })
      .addCase(getHotel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetPlaceError } = hotelSlice.actions;

export default hotelSlice.reducer;
