// User-facing mutations
export { useToggleFavorite } from './useFavoriteMutation';
export { useAddComment, useDeleteComment, useReportComment } from './useCommentMutation';
export {
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from './useNotificationMutation';
export { useUpdateProfile } from './useProfileMutation';

// Admin mutations
export { useDeleteBlog, useToggleFeatured } from './useBlogAdminMutation';
export { useApproveRequest, useRejectRequest, useDeleteRequest, useClearAllRequests } from './useRequestMutation';
export { useAddCategory, useUpdateCategory, useDeleteCategory } from './useCategoryMutation';
export { useMarkContactRead, useDeleteContact } from './useContactMutation';
export { useUpdateReportStatus, useDeleteReport, useDeleteReportedComment } from './useReportMutation';
export { useDeleteSubscriber } from './useNewsletterMutation';
export { useToggleBan, useDeleteUser } from './useUserAdminMutation';
