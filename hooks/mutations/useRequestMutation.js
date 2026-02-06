import { useMutation, useQueryClient } from '@tanstack/react-query';
import { approveRequest, rejectRequest, deleteRequest, clearAllRequests } from '@/api/blogRequests.mjs';
import { toast } from 'sonner';

/**
 * Hook for approving a blog request with optimistic updates
 */
export const useApproveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveRequest,

    onMutate: async (requestId) => {
      await queryClient.cancelQueries({ queryKey: ['allRequests'] });

      const previousData = queryClient.getQueryData(['allRequests']);

      // Update request status to approved
      queryClient.setQueryData(['allRequests'], (old) => {
        if (!old) return old;
        return old.map((req) =>
          req._id === requestId ? { ...req, status: 'approved', _isOptimistic: true } : req
        );
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['allRequests'], context.previousData);
      }
      toast.error(err?.response?.data?.message || 'Failed to approve request');
    },

    onSuccess: () => {
      toast.success('Request approved & blog published!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['allRequests'] });
    },
  });
};

/**
 * Hook for rejecting a blog request with optimistic updates
 */
export const useRejectRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectRequest,

    onMutate: async ({ id, adminNote }) => {
      await queryClient.cancelQueries({ queryKey: ['allRequests'] });

      const previousData = queryClient.getQueryData(['allRequests']);

      // Update request status to rejected
      queryClient.setQueryData(['allRequests'], (old) => {
        if (!old) return old;
        return old.map((req) =>
          req._id === id
            ? { ...req, status: 'rejected', adminNote: adminNote || '', _isOptimistic: true }
            : req
        );
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['allRequests'], context.previousData);
      }
      toast.error(err?.response?.data?.message || 'Failed to reject request');
    },

    onSuccess: () => {
      toast.success('Request rejected');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['allRequests'] });
    },
  });
};

/**
 * Hook for deleting a blog request with optimistic updates
 */
export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequest,

    onMutate: async (requestId) => {
      await queryClient.cancelQueries({ queryKey: ['allRequests'] });

      const previousData = queryClient.getQueryData(['allRequests']);

      // Remove request from list
      queryClient.setQueryData(['allRequests'], (old) => {
        if (!old) return old;
        return old.filter((req) => req._id !== requestId);
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['allRequests'], context.previousData);
      }
      toast.error(err?.response?.data?.message || 'Failed to delete request');
    },

    onSuccess: () => {
      toast.success('Request deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['allRequests'] });
    },
  });
};

/**
 * Hook for clearing all blog requests with optimistic updates
 */
export const useClearAllRequests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearAllRequests,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['allRequests'] });

      const previousData = queryClient.getQueryData(['allRequests']);

      queryClient.setQueryData(['allRequests'], []);

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['allRequests'], context.previousData);
      }
      toast.error(err?.response?.data?.message || 'Failed to clear requests');
    },

    onSuccess: () => {
      toast.success('All requests cleared');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['allRequests'] });
    },
  });
};
