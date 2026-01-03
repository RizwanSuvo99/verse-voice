import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment, reportComment } from '@/api/comments.mjs';
import { toast } from 'sonner';

/**
 * Generate a temporary ID for optimistic items
 */
const createTempId = () => `temp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/**
 * Hook for adding comments with optimistic updates
 */
export const useAddComment = (blogId, currentUser, callbacks = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,

    onMutate: async (variables) => {
      const { text, parentCommentId } = variables;

      await queryClient.cancelQueries({ queryKey: ['blog', blogId] });

      const previousBlog = queryClient.getQueryData(['blog', blogId]);

      // Create optimistic comment
      const optimisticComment = {
        _id: createTempId(),
        text,
        createdBy: currentUser
          ? {
              _id: currentUser._id,
              name: currentUser.name || currentUser.fullName,
              avatar: currentUser.avatar,
            }
          : { name: 'You', _id: 'temp' },
        createdAt: new Date().toISOString(),
        replies: [],
        _isOptimistic: true,
      };

      // Update blog query data - handle both { blog: {...} } and direct blog structure
      queryClient.setQueryData(['blog', blogId], (old) => {
        if (!old) return old;

        // Check if the data is wrapped in { blog: {...} } or is direct
        const blogData = old.blog || old;
        const comments = blogData.comments || [];

        let updatedComments;
        if (parentCommentId) {
          updatedComments = addReplyToComment(comments, parentCommentId, optimisticComment);
        } else {
          updatedComments = [optimisticComment, ...comments];
        }

        // Return in the same structure as received
        if (old.blog) {
          return {
            ...old,
            blog: {
              ...old.blog,
              comments: updatedComments,
            },
          };
        }

        return {
          ...old,
          comments: updatedComments,
        };
      });

      return { previousBlog };
    },

    onError: (err, variables, context) => {
      if (context?.previousBlog) {
        queryClient.setQueryData(['blog', blogId], context.previousBlog);
      }
      toast.error(err?.response?.data?.message || 'Failed to add comment');
    },

    onSuccess: () => {
      toast.success('Comment added!');
      callbacks.onSuccess?.();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', blogId] });
    },
  });
};

/**
 * Recursively add a reply to a comment
 */
const addReplyToComment = (comments, parentId, reply) => {
  return comments.map((comment) => {
    if (comment._id === parentId) {
      return {
        ...comment,
        replies: [reply, ...(comment.replies || [])],
      };
    }
    if (comment.replies?.length) {
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, parentId, reply),
      };
    }
    return comment;
  });
};

/**
 * Hook for deleting comments with optimistic updates
 */
export const useDeleteComment = (blogId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['blog', blogId] });

      const previousBlog = queryClient.getQueryData(['blog', blogId]);

      queryClient.setQueryData(['blog', blogId], (old) => {
        if (!old) return old;

        // Check if the data is wrapped in { blog: {...} } or is direct
        const blogData = old.blog || old;
        const comments = blogData.comments || [];
        const updatedComments = removeCommentById(comments, commentId);

        // Return in the same structure as received
        if (old.blog) {
          return {
            ...old,
            blog: {
              ...old.blog,
              comments: updatedComments,
            },
          };
        }

        return {
          ...old,
          comments: updatedComments,
        };
      });

      return { previousBlog };
    },

    onError: (err, variables, context) => {
      if (context?.previousBlog) {
        queryClient.setQueryData(['blog', blogId], context.previousBlog);
      }
      toast.error(err?.response?.data?.message || 'Failed to delete comment');
    },

    onSuccess: () => {
      toast.success('Comment deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', blogId] });
    },
  });
};

/**
 * Recursively remove a comment by ID
 */
const removeCommentById = (comments, commentId) => {
  return comments
    .filter((comment) => comment._id !== commentId)
    .map((comment) => ({
      ...comment,
      replies: comment.replies ? removeCommentById(comment.replies, commentId) : [],
    }));
};

/**
 * Hook for reporting comments
 */
export const useReportComment = (callbacks = {}) => {
  return useMutation({
    mutationFn: reportComment,

    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to report comment');
    },

    onSuccess: () => {
      toast.success('Comment reported. Admin will review it.');
      callbacks.onSuccess?.();
    },
  });
};
