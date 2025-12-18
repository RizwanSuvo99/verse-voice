import { useQuery } from '@tanstack/react-query';
import {
  getBlogs,
  getBlogById,
  getFeaturedBlogs,
  getPopularBlogs,
  getBlogsByCategory,
  getMyBlogs,
} from '@/api/blogs.mjs';
import { queryKeys, queryConfigs } from '@/lib/queryConfig';

export const useBlogs = (params = {}, options = {}) => {
  const { page = 1, limit = 10, search = '', sort = 'createdAt', order = 'desc', category = '', author = '' } = params;

  return useQuery({
    queryKey: queryKeys.blogs.list(page),
    queryFn: () => getBlogs({ page, limit, search, sort, order, category, author }),
    ...queryConfigs.blogList,
    ...options,
  });
};

export const useBlog = (id, options = {}) => {
  return useQuery({
    queryKey: queryKeys.blogs.detail(id),
    queryFn: () => getBlogById(id),
    enabled: !!id,
    ...queryConfigs.blogDetail,
    ...options,
  });
};

export const useFeaturedBlogs = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.blogs.featured(),
    queryFn: getFeaturedBlogs,
    ...queryConfigs.featuredBlogs,
    ...options,
  });
};

export const usePopularBlogs = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.blogs.popular(),
    queryFn: getPopularBlogs,
    ...queryConfigs.popularBlogs,
    ...options,
  });
};

export const useBlogsByCategory = (category, options = {}) => {
  return useQuery({
    queryKey: queryKeys.blogs.byCategory(category),
    queryFn: () => getBlogsByCategory(category),
    enabled: !!category,
    ...queryConfigs.blogList,
    ...options,
  });
};

export const useMyBlogs = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.blogs.my(),
    queryFn: getMyBlogs,
    ...queryConfigs.blogList,
    ...options,
  });
};
