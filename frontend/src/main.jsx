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
  SearchResults,
  Users,
  VerifyEmail,
} from './pages';
import { store } from './store';
import { Provider } from 'react-redux';

import withAuth from './HOC/withAuth';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

import './index.css';
import './sass/main.scss';
import { CategoryFilter } from './components';
import {
  CreateHotel,
  CreateCategory,
  Reservation,
  BookingConfirm,
} from './pages';

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
      path: '/search',
      element: <SearchResults />,
    },
    {
      path: '/hotel/:id',
      element: <HotelDetails />,
    },
    {
      path: '/hotel/:id/booking',
      element: <Reservation />,
      children: [
        {
          path: 'confirm',
          element: <BookingConfirm />,
        },
      ],
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
          children: [
            {
              path: 'create',
              element: <CreateCategory />,
            },
            {
              path: ':id/edit',
              element: <CreateCategory />,
            },
          ],
        },
        {
          path: 'hotels',
          element: <Hotels />,
          children: [
            {
              path: 'create',
              element: <CreateHotel />,
            },
            {
              path: ':id/edit',
              element: <CreateHotel />,
            },
          ],
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
