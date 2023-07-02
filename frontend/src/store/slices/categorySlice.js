import { createSlice } from '@reduxjs/toolkit';

import {
  createCategory,
  getCategories,
  updateCategory,
} from '../actions/categoryActions';

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
      })
      // Create category
      .addCase(createCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // Delete category
    // Get category by id
  },
});

export default categorySlice.reducer;
