import { useQuery } from '@tanstack/react-query';
import { getNotifications, getUnreadCount } from '@/api/notifications.mjs';
import { queryKeys, queryConfigs } from '@/lib/queryConfig';

export const useNotifications = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.notifications.all(),
    queryFn: getNotifications,
    ...queryConfigs.notifications,
    ...options,
  });
};

export const useUnreadCount = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount(),
    queryFn: getUnreadCount,
    ...queryConfigs.unreadCount,
    ...options,
  });
};
