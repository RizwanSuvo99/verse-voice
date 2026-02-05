import axios from 'axios';

const NEXT_PUBLIC_API_URL = 'https://backend-five-beta-ey61zod81u.vercel.app/api/v1';
const NEXT_PUBLIC_TEST_API_URL = 'http://localhost:8000/api/v1';

const BASE_URL = process.env.NODE_ENV === 'production' ? NEXT_PUBLIC_API_URL : NEXT_PUBLIC_TEST_API_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token dynamically
axiosPrivate.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = JSON.parse(localStorage.getItem('token') || 'null');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
const handleResponseError = (error) => {
  if (typeof window !== 'undefined') {
    const status = error?.response?.status;
    const { toast } = require('sonner');

    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      toast.error('Session expired. Please log in again.');
      window.location.href = '/login';
    } else if (status === 429) {
      toast.error('Too many requests. Please slow down.');
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    }
  }
  return Promise.reject(error);
};

axiosPrivate.interceptors.response.use((res) => res, handleResponseError);
