import { createSlice } from '@reduxjs/toolkit';
import { register, login, getMe } from '../actions/authActions';
import Swal from 'sweetalert2';

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
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.token = payload.token;
        state.role = payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.message = payload.message;
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Por favor inicia sesión',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/login';
          }
        });
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
