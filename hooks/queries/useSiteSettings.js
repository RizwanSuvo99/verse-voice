import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@/api/siteSettings.mjs';
import { queryKeys, queryConfigs } from '@/lib/queryConfig';

export const useSiteSettings = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.siteSettings(),
    queryFn: getSettings,
    ...queryConfigs.siteSettings,
    ...options,
  });
};
