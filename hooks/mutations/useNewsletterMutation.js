import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubscriber } from '@/api/newsletter.mjs';
import { toast } from 'sonner';

/**
 * Hook for deleting a newsletter subscriber with optimistic updates
 */
export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscriber,

    onMutate: async (subscriberId) => {
      await queryClient.cancelQueries({ queryKey: ['subscribers'] });

      const previousData = queryClient.getQueryData(['subscribers']);

      queryClient.setQueryData(['subscribers'], (old) => {
        if (!old) return old;
        return old.filter((sub) => sub._id !== subscriberId);
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['subscribers'], context.previousData);
      }
      toast.error(err?.response?.data?.message || 'Failed to delete subscriber');
    },

    onSuccess: () => {
      toast.success('Subscriber deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['subscribers'] });
    },
  });
};
