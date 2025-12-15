import axios from 'axios';

const NEXT_PUBLIC_API_URL = 'https://verse-voice-backend.vercel.app/api/v1';
const NEXT_PUBLIC_TEST_API_URL = 'http://localhost:8000/api/v1';

const BASE_URL = NEXT_PUBLIC_TEST_API_URL;

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
