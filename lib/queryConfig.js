// Stale times by data type
export const STALE_TIMES = {
  STATIC: 1000 * 60 * 60, // 60 min - site settings, categories
  SEMI_STATIC: 1000 * 60 * 15, // 15 min - featured/popular blogs
  DYNAMIC: 1000 * 60 * 5, // 5 min - blog detail, comments
  USER_DATA: 1000 * 60 * 3, // 3 min - user profile, favorites
  REALTIME: 0, // Always fresh - notifications
  PAGINATED: 1000 * 60 * 2, // 2 min - blog lists with filters
};

export const GC_TIMES = {
  STATIC: 1000 * 60 * 60 * 24, // 24 hours
  SEMI_STATIC: 1000 * 60 * 60, // 1 hour
  DYNAMIC: 1000 * 60 * 30, // 30 min
  USER_DATA: 1000 * 60 * 30, // 30 min
  REALTIME: 1000 * 60 * 5, // 5 min
  PAGINATED: 1000 * 60 * 15, // 15 min
};

// Query key factories
export const queryKeys = {
  siteSettings: () => ['siteSettings'],
  blogs: {
    all: () => ['blogs'],
    list: (filters = {}) => ['blogs', filters],
    detail: (id) => ['blog', id],
    featured: () => ['featuredBlogs'],
    popular: () => ['popularBlogs'],
    byCategory: (cat) => ['blogsByCategory', cat],
    my: () => ['myBlogs'],
  },
  user: {
    current: () => ['currentUser'],
    favorites: () => ['favorites'],
    favoriteCheck: (blogId) => ['favoriteCheck', blogId],
    favoriteCount: (blogId) => ['favoriteCount', blogId],
  },
  notifications: {
    all: () => ['notifications'],
    unreadCount: () => ['unreadCount'],
  },
  admin: {
    blogs: (...args) => ['adminBlogs', ...args],
    users: (page, search) => ['adminUsers', page, search],
    requests: () => ['allRequests'],
  },
};

// Per-query configurations
export const queryConfigs = {
  siteSettings: {
    staleTime: STALE_TIMES.STATIC,
    gcTime: GC_TIMES.STATIC,
    refetchOnMount: false,
  },
  featuredBlogs: {
    staleTime: STALE_TIMES.SEMI_STATIC,
    gcTime: GC_TIMES.SEMI_STATIC,
  },
  popularBlogs: {
    staleTime: STALE_TIMES.SEMI_STATIC,
    gcTime: GC_TIMES.SEMI_STATIC,
  },
  currentUser: {
    staleTime: STALE_TIMES.USER_DATA,
    gcTime: GC_TIMES.USER_DATA,
    retry: false,
  },
  notifications: {
    staleTime: STALE_TIMES.REALTIME,
    gcTime: GC_TIMES.REALTIME,
    refetchInterval: 30000,
  },
  unreadCount: {
    staleTime: STALE_TIMES.REALTIME,
    gcTime: GC_TIMES.REALTIME,
    refetchInterval: 30000,
  },
  blogList: {
    staleTime: STALE_TIMES.PAGINATED,
    gcTime: GC_TIMES.PAGINATED,
    placeholderData: (prev) => prev,
  },
  blogDetail: {
    staleTime: STALE_TIMES.DYNAMIC,
    gcTime: GC_TIMES.DYNAMIC,
  },
  favorites: {
    staleTime: STALE_TIMES.USER_DATA,
    gcTime: GC_TIMES.USER_DATA,
  },
};
