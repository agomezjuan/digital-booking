import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
