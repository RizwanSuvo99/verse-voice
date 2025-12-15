import axios from '@/utilities/axios';
import { axiosPrivate } from '@/utilities/axios';

export const subscribe = async ({ name, email }) => {
  const response = await axios.post('/newsletter', { name, email });
  return response.data;
};

export const getSubscribers = async () => {
  const response = await axiosPrivate.get('/newsletter');
  return response.data;
};
