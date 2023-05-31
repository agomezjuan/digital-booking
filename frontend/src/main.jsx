import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import './index.css';
import Admin from './pages/Admin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <h1>Pagina de login</h1>,
  },
  {
    path: '/register',
    element: <h1>Pagina de registro</h1>,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/tours/:id',
    element: <h1>Pagina de tour</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
