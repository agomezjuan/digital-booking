import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Admin,
  Categories,
  Dashboard,
  Home,
  HotelDetails,
  Hotels,
  Login,
  Register,
  Users,
  VerifyEmail,
} from './pages';
import { store } from './store';
import { Provider } from 'react-redux';

import withAuth from './HOC/withAuth';

import './index.css';
import './sass/main.scss';
import { CategoryFilter } from './components';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <div>Not Found</div>,
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
      path: '/category',
      element: <CategoryFilter />,
    },
    {
      path: '/hotel/:id',
      element: <HotelDetails />,
    },
    {
      path: '/admin',
      element: <Admin />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'users',
          element: <Users />,
        },
        {
          path: 'categories',
          element: <Categories />,
        },
        {
          path: 'hotels',
          element: <Hotels />,
        },
        {
          path: 'rooms',
          element: <div>Rooms</div>,
        },
        {
          path: 'bookings',
          element: <div>Bookings</div>,
        },
        {
          path: 'reviews',
          element: <div>Reviews</div>,
        },
        {
          path: 'support',
          element: <div>Support</div>,
        },
      ],
    },
    {
      path: '*',
      element: <div>Not Found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

const AppWithAuthValidation = withAuth(App);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppWithAuthValidation />
  </Provider>,
);
