import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/api/users.mjs';
import { getFavorites, checkFavorite, getFavoriteCount } from '@/api/favorites.mjs';
import { queryKeys, queryConfigs } from '@/lib/queryConfig';

export const useCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.user.current(),
    queryFn: getCurrentUser,
    ...queryConfigs.currentUser,
    ...options,
  });
};

export const useFavorites = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.user.favorites(),
    queryFn: getFavorites,
    ...queryConfigs.favorites,
    ...options,
  });
};

export const useFavoriteCheck = (blogId, options = {}) => {
  return useQuery({
    queryKey: queryKeys.user.favoriteCheck(blogId),
    queryFn: () => checkFavorite(blogId),
    enabled: !!blogId,
    ...queryConfigs.favorites,
    ...options,
  });
};

export const useFavoriteCount = (blogId, options = {}) => {
  return useQuery({
    queryKey: queryKeys.user.favoriteCount(blogId),
    queryFn: () => getFavoriteCount(blogId),
    enabled: !!blogId,
    ...queryConfigs.favorites,
    ...options,
  });
};
