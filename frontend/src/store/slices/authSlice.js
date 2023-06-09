import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  getMe,
  verifyUserEmail,
} from '../actions/authActions';

const initialState = {
  user: {},
  role: '',
  token: '',
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  isLoggedIn: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.role = '';
      state.token = '';
      state.status = 'idle';
      state.error = null;
      state.isLoggedIn = false;
      state.message = '';
      sessionStorage.removeItem('dhb_token');
    },
    resetUserError: (state) => {
      state.error = null;
      state.message = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.role = payload.role;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload.message;
        state.user = payload.data;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      // Get me
      .addCase(getMe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(verifyUserEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyUserEmail.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload;
      })
      .addCase(verifyUserEmail.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
        state.message = payload.message;
      });
  },
});

export const { logout, resetUserError } = authSlice.actions;

export default authSlice.reducer;
