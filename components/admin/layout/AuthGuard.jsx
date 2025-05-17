'use client';

import { useAuth } from '@/hooks/useAuth';
import { Center, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthGuard({ children }) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin/login');
    } else if (!isLoading && user && !isAdmin) {
      router.push('/'); // Redirect non-admin users to homepage
    }
  }, [user, isLoading, isAdmin, router]);

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (!user || !isAdmin) {
    return null; // Render nothing while redirecting
  }

  return children;
} 