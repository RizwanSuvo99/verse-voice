import { axiosPrivate } from '@/utilities/axios';

export const getAllUsers = async ({ page = 1, search = '' }) => {
  const response = await axiosPrivate.get('/users/admin/all', {
    params: { page, search },
  });
  return response.data;
};

export const toggleBanUser = async (userId) => {
  const response = await axiosPrivate.patch(`/users/${userId}/ban`);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosPrivate.delete(`/users/${userId}`);
  return response.data;
};
