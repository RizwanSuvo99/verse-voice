import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite } from '@/api/favorites.mjs';
import { toast } from 'sonner';

/**
 * Hook for toggling blog favorites with optimistic updates
 *
 * @param {string} blogId - The blog ID
 * @param {boolean} isFavorited - Current favorite state
 * @returns {Object} Mutation result
 */
export const useToggleFavorite = (blogId, isFavorited) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (isFavorited ? removeFavorite(blogId) : addFavorite(blogId)),

    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['favoriteCheck', blogId] });
      await queryClient.cancelQueries({ queryKey: ['favoriteCount', blogId] });

      // Snapshot previous values
      const previousCheck = queryClient.getQueryData(['favoriteCheck', blogId]);
      const previousCount = queryClient.getQueryData(['favoriteCount', blogId]);

      // Optimistically update favorite check
      queryClient.setQueryData(['favoriteCheck', blogId], { isFavorited: !isFavorited });

      // Optimistically update favorite count
      queryClient.setQueryData(['favoriteCount', blogId], (old) => {
        const currentCount = old?.count ?? 0;
        return { count: isFavorited ? Math.max(0, currentCount - 1) : currentCount + 1 };
      });

      return { previousCheck, previousCount };
    },

    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousCheck !== undefined) {
        queryClient.setQueryData(['favoriteCheck', blogId], context.previousCheck);
      }
      if (context?.previousCount !== undefined) {
        queryClient.setQueryData(['favoriteCount', blogId], context.previousCount);
      }
    },

    onSuccess: () => {
      const current = queryClient.getQueryData(['favoriteCheck', blogId]);
      toast.success(current?.isFavorited ? 'Added to favorites' : 'Removed from favorites');
    },

    onSettled: () => {
      // Always refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ['favoriteCheck', blogId] });
      queryClient.invalidateQueries({ queryKey: ['favoriteCount', blogId] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export default useToggleFavorite;
