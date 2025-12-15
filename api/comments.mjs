import { axiosPrivate } from '@/utilities/axios';

export const createComment = async ({ blogId, text }) => {
  const response = await axiosPrivate.post(`/blogs/${blogId}/comments`, { text });
  return response.data;
};

export const updateComment = async ({ id, text }) => {
  const response = await axiosPrivate.put(`/blogs/comments/${id}`, { text });
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axiosPrivate.delete(`/blogs/comments/${id}`);
  return response.data;
};
