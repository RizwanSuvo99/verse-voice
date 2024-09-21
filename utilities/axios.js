import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_TEST_API_URL;

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
