import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBlog, toggleFeatured } from '@/api/adminBlogs.mjs';
import { toast } from 'sonner';

/**
 * Hook for deleting a blog with optimistic updates (admin)
 */
export const useDeleteBlog = (queryParams = {}) => {
  const queryClient = useQueryClient();
  const { page, title, category, author } = queryParams;
  const adminBlogsKey = ['adminBlogs', page, title, category, author];

  return useMutation({
    mutationFn: deleteBlog,

    onMutate: async (blogId) => {
      await queryClient.cancelQueries({ queryKey: adminBlogsKey });

      const previousData = queryClient.getQueryData(adminBlogsKey);

      // Remove blog from admin blogs list (handles { blogs: [...] } structure)
      queryClient.setQueryData(adminBlogsKey, (old) => {
        if (!old) return old;
        if (old.blogs) {
          return {
            ...old,
            blogs: old.blogs.filter((blog) => blog._id !== blogId),
            total: (old.total || 0) - 1,
          };
        }
        if (Array.isArray(old)) {
          return old.filter((blog) => blog._id !== blogId);
        }
        return old;
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(adminBlogsKey, context.previousData);
      }
    },

    onSuccess: () => {
      toast.success('Blog deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogs'] });
    },
  });
};

/**
 * Hook for toggling blog featured status with optimistic updates (admin)
 */
export const useToggleFeatured = (queryParams = {}) => {
  const queryClient = useQueryClient();
  const { page, title, category, author } = queryParams;
  const adminBlogsKey = ['adminBlogs', page, title, category, author];

  return useMutation({
    mutationFn: toggleFeatured,

    onMutate: async (blogId) => {
      await queryClient.cancelQueries({ queryKey: adminBlogsKey });

      const previousData = queryClient.getQueryData(adminBlogsKey);

      // Toggle featured status in admin blogs
      queryClient.setQueryData(adminBlogsKey, (old) => {
        if (!old) return old;
        if (old.blogs) {
          return {
            ...old,
            blogs: old.blogs.map((blog) =>
              blog._id === blogId ? { ...blog, isFeatured: !blog.isFeatured } : blog
            ),
          };
        }
        if (Array.isArray(old)) {
          return old.map((blog) =>
            blog._id === blogId ? { ...blog, isFeatured: !blog.isFeatured } : blog
          );
        }
        return old;
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(adminBlogsKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogs'] });
      queryClient.invalidateQueries({ queryKey: ['featuredBlogs'] });
    },
  });
};
