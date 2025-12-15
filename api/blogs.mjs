import axios from '@/utilities/axios';

export const getBlogs = async ({ page = 1, limit = 10, search = '', sort = 'createdAt', order = 'desc' } = {}) => {
  const response = await axios.get('/blogs', {
    params: { page, limit, search, sort, order },
  });
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await axios.get(`/blogs/${id}`);
  return response.data;
};

export const getBlogsByCategory = async (category) => {
  const response = await axios.get(`/blogs/category/${category}`);
  return response.data;
};

export const getFeaturedBlogs = async () => {
  const response = await axios.get('/blogs/featured');
  return response.data;
};

export const getPopularBlogs = async () => {
  const response = await axios.get('/blogs/popular');
  return response.data;
};

export const getMyBlogs = async () => {
  const { axiosPrivate } = await import('@/utilities/axios');
  const response = await axiosPrivate.get('/blogs/my');
  return response.data;
};
