'use client';

import { Center, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const RequireAuth = ({ children }) => {
  const router = useRouter();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('token');
      const token = raw ? JSON.parse(raw) : null;
      const loggedIn = JSON.parse(
        localStorage.getItem('isLoggedIn') || 'false',
      );

      if (token && loggedIn) {
        setStatus('authenticated');
      } else {
        router.replace('/login');
      }
    } catch {
      router.replace('/login');
    }
  }, [router]);

  if (status === 'loading') {
    return (
      <Center h="60vh">
        <Loader size="lg" />
      </Center>
    );
  }

  return children;
};

export default RequireAuth;
