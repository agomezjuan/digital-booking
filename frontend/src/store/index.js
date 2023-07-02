import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';
import hotelReducer from './slices/hotelSlice';
import featureReducer from './slices/featureSlice';
import reservationReducer from './slices/reservationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    hotel: hotelReducer,
    feature: featureReducer,
    reservation: reservationReducer,
  },
});
