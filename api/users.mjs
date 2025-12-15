import { axiosPrivate } from '@/utilities/axios';

export const getCurrentUser = async () => {
  const response = await axiosPrivate.get('/users/me');
  return response.data;
};

export const updateProfile = async (formData) => {
  const response = await axiosPrivate.put('/users/me', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
