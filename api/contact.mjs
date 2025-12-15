import axios from '@/utilities/axios';
import { axiosPrivate } from '@/utilities/axios';

export const submitContact = async (data) => {
  const response = await axios.post('/contact', data);
  return response.data;
};

export const getAllContacts = async () => {
  const response = await axiosPrivate.get('/contact');
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await axiosPrivate.put(`/contact/${id}/read`);
  return response.data;
};
