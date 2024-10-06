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

const token = localStorage.getItem('accessToken');
console.log(token);

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
