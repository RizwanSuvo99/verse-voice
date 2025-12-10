import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const PERSISTABLE_KEYS = ['siteSettings', 'featuredBlogs', 'popularBlogs', 'currentUser'];

export const createPersister = () => {
  if (typeof window === 'undefined') return null;

  return createSyncStoragePersister({
    storage: window.localStorage,
    key: 'VERSEVOICE_QUERY_CACHE',
    throttleTime: 1000,
    serialize: (data) => {
      const filtered = {
        ...data,
        clientState: {
          ...data.clientState,
          queries: data.clientState.queries.filter((q) =>
            PERSISTABLE_KEYS.some((key) => q.queryKey[0] === key)
          ),
        },
      };
      return JSON.stringify(filtered);
    },
    deserialize: (data) => JSON.parse(data),
  });
};

export const CACHE_VERSION = 'v1.0.0';
