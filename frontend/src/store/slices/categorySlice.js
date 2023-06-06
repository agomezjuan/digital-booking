import { createSlice } from '@reduxjs/toolkit';

import { getCategories } from '../actions/categoryActions';

const initialState = {
  categories: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get categories
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.categories = payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
