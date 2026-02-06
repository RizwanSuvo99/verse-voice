import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAsRead, markAllAsRead, deleteNotification } from '@/api/notifications.mjs';
import { toast } from 'sonner';

/**
 * Hook for marking a single notification as read with optimistic updates
 */
export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['unreadCount'] });

      const previousNotifications = queryClient.getQueryData(['notifications']);
      const previousUnreadCount = queryClient.getQueryData(['unreadCount']);

      // Mark notification as read in the list
      queryClient.setQueryData(['notifications'], (old) => {
        if (!old) return old;
        return old.map((notif) =>
          notif._id === notificationId ? { ...notif, isRead: true, read: true } : notif
        );
      });

      // Decrement unread count
      queryClient.setQueryData(['unreadCount'], (old) => {
        const count = old?.count ?? 0;
        return { count: Math.max(0, count - 1) };
      });

      return { previousNotifications, previousUnreadCount };
    },

    onError: (err, variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
      if (context?.previousUnreadCount) {
        queryClient.setQueryData(['unreadCount'], context.previousUnreadCount);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * Hook for marking all notifications as read with optimistic updates
 */
export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllAsRead,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['unreadCount'] });

      const previousNotifications = queryClient.getQueryData(['notifications']);
      const previousUnreadCount = queryClient.getQueryData(['unreadCount']);

      // Mark all notifications as read
      queryClient.setQueryData(['notifications'], (old) => {
        if (!old) return old;
        return old.map((notif) => ({ ...notif, isRead: true, read: true }));
      });

      // Set unread count to 0
      queryClient.setQueryData(['unreadCount'], { count: 0 });

      return { previousNotifications, previousUnreadCount };
    },

    onError: (err, variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
      if (context?.previousUnreadCount) {
        queryClient.setQueryData(['unreadCount'], context.previousUnreadCount);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * Hook for deleting a notification with optimistic updates
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      await queryClient.cancelQueries({ queryKey: ['unreadCount'] });

      const previousNotifications = queryClient.getQueryData(['notifications']);
      const previousUnreadCount = queryClient.getQueryData(['unreadCount']);

      // Check if notification was unread
      let wasUnread = false;
      if (previousNotifications) {
        const notification = previousNotifications.find((n) => n._id === notificationId);
        wasUnread = notification && !notification.isRead && !notification.read;
      }

      // Remove notification from list
      queryClient.setQueryData(['notifications'], (old) => {
        if (!old) return old;
        return old.filter((n) => n._id !== notificationId);
      });

      // Decrement unread count if notification was unread
      if (wasUnread) {
        queryClient.setQueryData(['unreadCount'], (old) => {
          const count = old?.count ?? 0;
          return { count: Math.max(0, count - 1) };
        });
      }

      return { previousNotifications, previousUnreadCount };
    },

    onError: (err, variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
      if (context?.previousUnreadCount) {
        queryClient.setQueryData(['unreadCount'], context.previousUnreadCount);
      }
    },

    onSuccess: () => {
      toast.success('Notification deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
