import { createSlice } from '@reduxjs/toolkit';

import { getFeatures } from '../actions/featureActions';

const initialState = {
  features: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get features
      .addCase(getFeatures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFeatures.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.features = payload;
      })
      .addCase(getFeatures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // Get feature by id
    // Create feature
    // Update feature
    // Delete feature
  },
});

export default featureSlice.reducer;
