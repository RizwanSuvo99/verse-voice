import { queryKeys } from './queryConfig';

export const invalidationPatterns = {
  blogMutation: (qc, blogId) => {
    qc.invalidateQueries({ queryKey: queryKeys.blogs.all() });
    qc.invalidateQueries({ queryKey: queryKeys.blogs.featured() });
    qc.invalidateQueries({ queryKey: queryKeys.blogs.popular() });
    if (blogId) qc.invalidateQueries({ queryKey: queryKeys.blogs.detail(blogId) });
  },

  favoriteToggle: (qc, blogId) => {
    qc.invalidateQueries({ queryKey: queryKeys.user.favorites() });
    qc.invalidateQueries({ queryKey: queryKeys.user.favoriteCheck(blogId) });
    qc.invalidateQueries({ queryKey: queryKeys.user.favoriteCount(blogId) });
  },

  logout: (qc) => {
    qc.removeQueries({ queryKey: queryKeys.user.current() });
    qc.removeQueries({ queryKey: queryKeys.user.favorites() });
    qc.removeQueries({ queryKey: queryKeys.notifications.all() });
  },

  notificationRead: (qc) => {
    qc.invalidateQueries({ queryKey: queryKeys.notifications.all() });
    qc.invalidateQueries({ queryKey: queryKeys.notifications.unreadCount() });
  },

  userUpdate: (qc) => {
    qc.invalidateQueries({ queryKey: queryKeys.user.current() });
  },

  siteSettingsUpdate: (qc) => {
    qc.invalidateQueries({ queryKey: queryKeys.siteSettings() });
  },
};
