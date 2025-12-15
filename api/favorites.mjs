import axios from '@/utilities/axios';
import { axiosPrivate } from '@/utilities/axios';

export const addFavorite = async (blogId) => {
  const response = await axiosPrivate.post(`/favorites/${blogId}`);
  return response.data;
};

export const removeFavorite = async (blogId) => {
  const response = await axiosPrivate.delete(`/favorites/${blogId}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await axiosPrivate.get('/favorites');
  return response.data;
};

export const checkFavorite = async (blogId) => {
  const response = await axiosPrivate.get(`/favorites/check/${blogId}`);
  return response.data;
};

export const getFavoriteCount = async (blogId) => {
  const response = await axios.get(`/favorites/count/${blogId}`);
  return response.data;
};

export const getAllFavoriteCounts = async () => {
  const response = await axios.get('/favorites/counts');
  return response.data;
};

export const getFavoritedUsers = async (blogId) => {
  const response = await axios.get(`/favorites/users/${blogId}`);
  return response.data;
};
