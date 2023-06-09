// import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Home from './pages/Home.jsx';
import './index.css';
import './sass/main.scss';
import Admin from './pages/Admin.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import HotelDetails from './pages/HotelDetails.jsx';
import VerifyEmail from './pages/VerifyEmail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/auth/verify/:token',
    element: <VerifyEmail />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/hotel',
    element: <HotelDetails />,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  // </React.StrictMode>,
);
