import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markAsRead, deleteContact } from '@/api/contact.mjs';
import { toast } from 'sonner';

/**
 * Hook for marking a contact message as read with optimistic updates
 */
export const useMarkContactRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,

    onMutate: async (contactId) => {
      await queryClient.cancelQueries({ queryKey: ['contacts'] });

      const previousData = queryClient.getQueryData(['contacts']);

      // Mark contact as read
      queryClient.setQueryData(['contacts'], (old) => {
        if (!old) return old;
        return old.map((msg) =>
          msg._id === contactId ? { ...msg, isRead: true } : msg
        );
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['contacts'], context.previousData);
      }
    },

    onSuccess: () => {
      toast.success('Marked as read');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

/**
 * Hook for deleting a contact message with optimistic updates
 */
export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,

    onMutate: async (contactId) => {
      await queryClient.cancelQueries({ queryKey: ['contacts'] });

      const previousData = queryClient.getQueryData(['contacts']);

      // Remove contact from list
      queryClient.setQueryData(['contacts'], (old) => {
        if (!old) return old;
        return old.filter((msg) => msg._id !== contactId);
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['contacts'], context.previousData);
      }
      toast.error('Failed to delete message');
    },

    onSuccess: () => {
      toast.success('Message deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};
