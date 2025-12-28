import { axiosPrivate } from '@/utilities/axios';

export const createComment = async ({ blogId, text, parentCommentId }) => {
  const response = await axiosPrivate.post(`/blogs/${blogId}/comments`, {
    text,
    parentCommentId
  });
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

// Comment Reports
export const reportComment = async ({ commentId, reason, description }) => {
  const response = await axiosPrivate.post('/comment-reports', {
    commentId,
    reason,
    description
  });
  return response.data;
};

export const getAllReports = async () => {
  const response = await axiosPrivate.get('/comment-reports');
  return response.data;
};

export const updateReportStatus = async ({ id, status }) => {
  const response = await axiosPrivate.put(`/comment-reports/${id}/status`, { status });
  return response.data;
};

export const deleteReport = async (id) => {
  const response = await axiosPrivate.delete(`/comment-reports/${id}`);
  return response.data;
};

export const deleteReportedComment = async (id) => {
  const response = await axiosPrivate.delete(`/comment-reports/${id}/comment`);
  return response.data;
};
