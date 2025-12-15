import axios from '@/utilities/axios';
import { axiosPrivate } from '@/utilities/axios';

export const getSettings = async () => {
  const response = await axios.get('/settings');
  return response.data;
};

export const updateSettings = async (data) => {
  const response = await axiosPrivate.put('/settings', data);
  return response.data;
};

export const addCategory = async (formData) => {
  const response = await axiosPrivate.post('/settings/categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateCategory = async ({ oldName, formData }) => {
  const response = await axiosPrivate.put(`/settings/categories/${oldName}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteCategory = async (name) => {
  const response = await axiosPrivate.delete(`/settings/categories/${name}`);
  return response.data;
};
