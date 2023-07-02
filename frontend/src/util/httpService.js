import axios from 'axios';

const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default httpService;

// Request interceptor (Outgoing)
httpService.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // Request authorization
    // dhb_token: Digital Booking Token. This token is generated when the user logs in.
    if (sessionStorage.getItem('dhb_token')) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        'dhb_token',
      )}`;
    }
    return config;
  },
  function (error) {
    // Request error
    return Promise.reject(error);
  },
);

// Response interceptor (Incoming) - Optional
httpService.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    // Response data
    console.log('Interceptor Response (Incoming) ', response);

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    // Do something with response error
    return Promise.reject(error);
  },
);
