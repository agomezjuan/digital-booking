import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import './index.css';
import Admin from './pages/Admin.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import HotelDetails from './pages/HotelDetails.jsx';

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
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/hotel',
    element: <HotelDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
