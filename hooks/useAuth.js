'use client';

import { getCurrentUser } from '@/api/user.mjs';
import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const useAuth = () => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  const [token, setToken] = useLocalStorage({
    key: 'token',
    defaultValue: null,
  });

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage({
    key: 'isLoggedIn',
    defaultValue: false,
  });

  // Mark as hydrated after first client-side render
  // so we know localStorage values are now real
  useEffect(() => {
    setHydrated(true);
  }, []);

  const { data: user, isLoading: isQueryLoading, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: hydrated && !!token && isLoggedIn === true,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const logout = useCallback(() => {
    setToken(null);
    setIsLoggedIn(false);
    router.push('/');
  }, [setToken, setIsLoggedIn, router]);

  // Still loading if not hydrated yet, or if query is in progress
  const isLoading = !hydrated || (!!token && isLoggedIn && isQueryLoading);

  return {
    user,
    token,
    isLoggedIn: hydrated ? isLoggedIn : false,
    isLoading,
    isAdmin: user?.isSuperUser || false,
    logout,
    refetch,
  };
};

export default useAuth;
