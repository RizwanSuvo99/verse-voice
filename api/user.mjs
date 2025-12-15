import { axiosPrivate } from '@/utilities/axios';

export const getCurrentUser = async () => {
  const response = await axiosPrivate.get('/users/me');
  return response.data;
};
