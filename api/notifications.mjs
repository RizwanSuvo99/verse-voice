import { axiosPrivate } from '@/utilities/axios';

export const getNotifications = async () => {
  const response = await axiosPrivate.get('/notifications');
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await axiosPrivate.get('/notifications/unread-count');
  return response.data;
};

export const markAsRead = async (id) => {
  const response = await axiosPrivate.put(`/notifications/${id}/read`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await axiosPrivate.put('/notifications/mark-all-read');
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await axiosPrivate.delete(`/notifications/${id}`);
  return response.data;
};
