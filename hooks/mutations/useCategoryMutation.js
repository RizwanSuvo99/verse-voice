import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCategory, updateCategory, deleteCategory } from '@/api/siteSettings.mjs';
import { toast } from 'sonner';

const createTempId = () => `temp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/**
 * Hook for adding a category with optimistic updates
 */
export const useAddCategory = (callbacks = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,

    onMutate: async (formData) => {
      await queryClient.cancelQueries({ queryKey: ['siteSettings'] });

      const previousData = queryClient.getQueryData(['siteSettings']);

      const name = formData.get('name');

      // Create optimistic category
      const optimisticCategory = {
        _id: createTempId(),
        name,
        image: null,
        _isOptimistic: true,
      };

      // Add to siteSettings categories
      queryClient.setQueryData(['siteSettings'], (old) => {
        if (!old) return old;
        const categories = old.categories || [];
        return {
          ...old,
          categories: [...categories, optimisticCategory],
        };
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['siteSettings'], context.previousData);
      }
      toast.error(err?.response?.data?.message || 'Failed to add category');
    },

    onSuccess: () => {
      toast.success('Category added!');
      callbacks.onSuccess?.();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
    },
  });
};

/**
 * Hook for updating a category with optimistic updates
 */
export const useUpdateCategory = (callbacks = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,

    onMutate: async ({ oldName, formData }) => {
      await queryClient.cancelQueries({ queryKey: ['siteSettings'] });

      const previousData = queryClient.getQueryData(['siteSettings']);

      const newName = formData.get('name');

      // Update category in siteSettings
      queryClient.setQueryData(['siteSettings'], (old) => {
        if (!old?.categories) return old;
        return {
          ...old,
          categories: old.categories.map((cat) =>
            cat.name === oldName
              ? { ...cat, name: newName || cat.name, _isOptimistic: true }
              : cat
          ),
        };
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['siteSettings'], context.previousData);
      }
      toast.error(err?.response?.data?.message || 'Failed to update category');
    },

    onSuccess: () => {
      toast.success('Category updated!');
      callbacks.onSuccess?.();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
    },
  });
};

/**
 * Hook for deleting a category with optimistic updates
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onMutate: async (categoryName) => {
      await queryClient.cancelQueries({ queryKey: ['siteSettings'] });

      const previousData = queryClient.getQueryData(['siteSettings']);

      // Remove category from siteSettings
      queryClient.setQueryData(['siteSettings'], (old) => {
        if (!old?.categories) return old;
        return {
          ...old,
          categories: old.categories.filter((cat) => cat.name !== categoryName),
        };
      });

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['siteSettings'], context.previousData);
      }
      toast.error(err?.response?.data?.message || 'Failed to delete category');
    },

    onSuccess: () => {
      toast.success('Category deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
    },
  });
};
