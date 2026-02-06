import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReportStatus, deleteReport, deleteReportedComment } from '@/api/comments.mjs';
import { toast } from 'sonner';

/**
 * Hook for updating report status with optimistic updates
 */
export const useUpdateReportStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReportStatus,

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['commentReports'] });

      const previousData = queryClient.getQueryData(['commentReports']);

      // Update report status
      queryClient.setQueryData(['commentReports'], (old) => {
        if (!old) return old;
        return old.map((report) =>
          report._id === id ? { ...report, status, _isOptimistic: true } : report
        );
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['commentReports'], context.previousData);
      }
    },

    onSuccess: () => {
      toast.success('Report status updated');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReports'] });
    },
  });
};

/**
 * Hook for deleting/dismissing a report with optimistic updates
 */
export const useDeleteReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReport,

    onMutate: async (reportId) => {
      await queryClient.cancelQueries({ queryKey: ['commentReports'] });

      const previousData = queryClient.getQueryData(['commentReports']);

      // Remove report from list
      queryClient.setQueryData(['commentReports'], (old) => {
        if (!old) return old;
        return old.filter((report) => report._id !== reportId);
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['commentReports'], context.previousData);
      }
    },

    onSuccess: () => {
      toast.success('Report dismissed');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReports'] });
    },
  });
};

/**
 * Hook for deleting a reported comment (and associated reports) with optimistic updates
 */
export const useDeleteReportedComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReportedComment,

    onMutate: async (reportId) => {
      await queryClient.cancelQueries({ queryKey: ['commentReports'] });

      const previousData = queryClient.getQueryData(['commentReports']);

      // Get the report to find the comment ID
      let commentId = null;
      if (previousData) {
        const report = previousData.find((r) => r._id === reportId);
        commentId = report?.comment?._id;
      }

      // Remove all reports for this comment
      if (commentId) {
        queryClient.setQueryData(['commentReports'], (old) => {
          if (!old) return old;
          return old.filter((r) => r.comment?._id !== commentId);
        });
      } else {
        // If we can't find the comment ID, just remove this report
        queryClient.setQueryData(['commentReports'], (old) => {
          if (!old) return old;
          return old.filter((r) => r._id !== reportId);
        });
      }

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['commentReports'], context.previousData);
      }
    },

    onSuccess: () => {
      toast.success('Comment and reports deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReports'] });
    },
  });
};
