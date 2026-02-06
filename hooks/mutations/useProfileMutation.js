import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/api/users.mjs';
import { toast } from 'sonner';

/**
 * Hook for updating user profile with optimistic updates
 */
export const useUpdateProfile = (callbacks = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onMutate: async (formData) => {
      await queryClient.cancelQueries({ queryKey: ['currentUser'] });

      const previousData = queryClient.getQueryData(['currentUser']);

      // Extract text fields from FormData for optimistic update
      // Note: Avatar update will be reflected after server response
      const fullName = formData.get('fullName');
      const name = formData.get('name');
      const bio = formData.get('bio');

      // Only update text fields optimistically (not avatar)
      queryClient.setQueryData(['currentUser'], (old) => {
        if (!old) return old;

        const updates = {};
        if (fullName) updates.fullName = fullName;
        if (name) updates.name = name;
        if (bio !== null && bio !== undefined) updates.bio = bio;

        // Handle nested user object structure if present
        if (old.user) {
          return {
            ...old,
            user: {
              ...old.user,
              ...updates,
            },
          };
        }

        return {
          ...old,
          ...updates,
        };
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['currentUser'], context.previousData);
      }
    },

    onSuccess: () => {
      toast.success('Profile updated!');
      callbacks.onSuccess?.();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export default useUpdateProfile;
