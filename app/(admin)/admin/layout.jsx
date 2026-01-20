'use client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { Yesteryear } from 'next/font/google';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  Center,
  ColorSchemeScript,
  createTheme,
  Loader,
  MantineProvider,
  Text,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '../../(user)/globals.css';
import { axiosPrivate } from '@/utilities/axios';
import { useEffect, useState } from 'react';

const yesteryear = Yesteryear({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-yesteryear',
});

const theme = createTheme({
  focusRing: 'never',
  black: '#344161',
  cursorType: 'pointer',
  fontFamily: 'Noto Sans, sans-serif',
  defaultGradient: {
    from: '#0ea5ea',
    to: '#0bd1d1',
    deg: 45,
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

// Create a client
const queryClient = new QueryClient();

function AdminGuard({ children }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'authorized' | 'unauthorized'

  useEffect(() => {
    async function checkAdmin() {
      try {
        // Read token directly from localStorage — no React hooks, no hydration delays
        const raw = localStorage.getItem('token');
        const token = raw ? JSON.parse(raw) : null;

        if (!token) {
          window.location.href = '/login';
          return;
        }

        // Call the API directly to verify admin status
        const response = await axiosPrivate.get('/users/me');
        const user = response.data;

        if (user?.isSuperUser) {
          setStatus('authorized');
        } else {
          window.location.href = '/';
        }
      } catch {
        window.location.href = '/login';
      }
    }

    checkAdmin();
  }, []);

  if (status === 'loading') {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (status !== 'authorized') {
    return (
      <Center h="100vh">
        <Text c="dimmed">Redirecting...</Text>
      </Center>
    );
  }

  return children;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${yesteryear.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Notifications />
            <AdminGuard>{children}</AdminGuard>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
