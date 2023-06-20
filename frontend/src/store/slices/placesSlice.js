import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  message: '',
  places: [],
  place: {},
  placeId: '',
  placeName: '',
  placeAddress: '',
  placeDescription: '',
  placeImage: '',
  placeLat: '',
  placeLng: '',
  placeType: '',
  placeRating: '',
  placeComments: [],
};

const placesSlice = createSlice({
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
    builder;
  },
});

export const { resetPlaceError } = placesSlice.actions;
