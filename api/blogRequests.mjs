import { axiosPrivate } from '@/utilities/axios';

export const submitBlogRequest = async (formData) => {
  const response = await axiosPrivate.post('/blog-requests', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getMyRequests = async () => {
  const response = await axiosPrivate.get('/blog-requests/my');
  return response.data;
};

export const getAllRequests = async () => {
  const response = await axiosPrivate.get('/blog-requests');
  return response.data;
};

export const approveRequest = async (id) => {
  const response = await axiosPrivate.put(`/blog-requests/${id}/approve`);
  return response.data;
};

export const rejectRequest = async ({ id, adminNote }) => {
  const response = await axiosPrivate.put(`/blog-requests/${id}/reject`, { adminNote });
  return response.data;
};

export const deleteRequest = async (id) => {
  const response = await axiosPrivate.delete(`/blog-requests/${id}`);
  return response.data;
};
