import { axiosPrivate } from '@/utilities/axios';

export const createBlog = async (formData) => {
  const response = await axiosPrivate.post('/blogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateBlog = async ({ id, data }) => {
  const response = await axiosPrivate.put(`/blogs/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axiosPrivate.delete(`/blogs/${id}`);
  return response.data;
};

export const toggleFeatured = async (id) => {
  const response = await axiosPrivate.put(`/blogs/${id}/feature`);
  return response.data;
};
