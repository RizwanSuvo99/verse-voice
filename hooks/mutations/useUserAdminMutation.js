import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBanUser, deleteUser } from '@/api/adminUsers.mjs';
import { toast } from 'sonner';

/**
 * Hook for toggling user ban status with optimistic updates (admin)
 */
export const useToggleBan = (queryParams = {}) => {
  const queryClient = useQueryClient();
  const { page, search } = queryParams;
  const adminUsersKey = ['adminUsers', page, search];

  return useMutation({
    mutationFn: toggleBanUser,

    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: adminUsersKey });

      const previousData = queryClient.getQueryData(adminUsersKey);

      queryClient.setQueryData(adminUsersKey, (old) => {
        if (!old) return old;
        if (old.users) {
          return {
            ...old,
            users: old.users.map((user) =>
              user._id === userId ? { ...user, isBanned: !user.isBanned } : user
            ),
          };
        }
        return old;
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(adminUsersKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
  });
};

/**
 * Hook for deleting a user with optimistic updates (admin)
 */
export const useDeleteUser = (queryParams = {}) => {
  const queryClient = useQueryClient();
  const { page, search } = queryParams;
  const adminUsersKey = ['adminUsers', page, search];

  return useMutation({
    mutationFn: deleteUser,

    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: adminUsersKey });

      const previousData = queryClient.getQueryData(adminUsersKey);

      queryClient.setQueryData(adminUsersKey, (old) => {
        if (!old) return old;
        if (old.users) {
          return {
            ...old,
            users: old.users.filter((user) => user._id !== userId),
            total: (old.total || 0) - 1,
          };
        }
        return old;
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(adminUsersKey, context.previousData);
      }
    },

    onSuccess: () => {
      toast.success('User deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
  });
};
