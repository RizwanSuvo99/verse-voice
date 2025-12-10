'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { createPersister } from '@/lib/queryPersister';
import { STALE_TIMES, GC_TIMES } from '@/lib/queryConfig';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIMES.DYNAMIC,
        gcTime: GC_TIMES.DYNAMIC,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

let browserQueryClient;

function getQueryClient() {
  if (typeof window === 'undefined') return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function QueryProvider({ children, enablePersistence = true }) {
  const [persister, setPersister] = useState(null);
  const queryClient = getQueryClient();

  useEffect(() => {
    if (enablePersistence && typeof window !== 'undefined') {
      setPersister(createPersister());
    }
  }, [enablePersistence]);

  if (persister && enablePersistence) {
    return (
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
          maxAge: 1000 * 60 * 60 * 24,
          dehydrateOptions: {
            shouldDehydrateQuery: (q) => q.state.status === 'success',
          },
        }}
      >
        {children}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </PersistQueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
