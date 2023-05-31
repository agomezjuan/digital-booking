import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import './index.css';

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
    path: '/tours',
    element: <h1>Pagina de tours</h1>,
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
