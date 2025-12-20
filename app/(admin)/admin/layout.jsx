'use client';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Inter, Yesteryear } from 'next/font/google';

import { QueryProvider } from '@/components/providers/QueryProvider';
import {
  Center,
  ColorSchemeScript,
  createTheme,
  Loader,
  MantineProvider,
  Text,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';
import '../../(user)/globals.css';
import { axiosPrivate } from '@/utilities/axios';
import { useEffect, useState } from 'react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const yesteryear = Yesteryear({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-yesteryear',
});

const theme = createTheme({
  focusRing: 'auto',
  black: '#0a0a1a',
  cursorType: 'pointer',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  primaryColor: 'cyan',
  primaryShade: { light: 6, dark: 5 },
  defaultGradient: {
    from: '#00e5ff',
    to: '#a855f7',
    deg: 135,
  },
  defaultRadius: 'md',
  colors: {
    dark: [
      '#eef0f6',
      '#8b8fa8',
      '#555870',
      '#3a3d55',
      '#282b40',
      '#1a1d30',
      '#12142a',
      '#0d0f20',
      '#0a0c18',
      '#06060e',
    ],
    cyan: [
      '#e0fffe',
      '#b3fffc',
      '#80fff8',
      '#4df5ed',
      '#26e8df',
      '#00e5ff',
      '#00c4d9',
      '#00a3b4',
      '#00828f',
      '#00616b',
    ],
  },
  fontSizes: {
    xs: '12px',
    sm: '13px',
    md: '14px',
    lg: '16px',
    xl: '18px',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '32px', lineHeight: '1.2' },
      h2: { fontSize: '24px', lineHeight: '1.3' },
      h3: { fontSize: '20px', lineHeight: '1.4' },
      h4: { fontSize: '16px', lineHeight: '1.4' },
    },
  },
  components: {
    Card: {
      defaultProps: { radius: 'lg' },
      styles: () => ({
        root: {
          backgroundColor: 'var(--bg-surface)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-default)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
        },
      }),
    },
    Paper: {
      defaultProps: { radius: 'lg' },
      styles: () => ({
        root: {
          backgroundColor: 'var(--bg-surface)',
          backdropFilter: 'blur(16px)',
        },
      }),
    },
    Button: {
      defaultProps: { radius: 'md' },
      styles: () => ({
        root: {
          fontWeight: 500,
          borderRadius: '12px',
          transition: 'all 0.3s ease',
        },
      }),
    },
    TextInput: {
      defaultProps: { radius: 'md' },
      styles: () => ({
        input: {
          height: '44px',
          backgroundColor: 'var(--bg-elevated)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease',
          '&:focus': {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 12px var(--accent-glow)',
          },
        },
      }),
    },
    Textarea: {
      defaultProps: { radius: 'md' },
      styles: () => ({
        input: {
          backgroundColor: 'var(--bg-elevated)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border-default)',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease',
          '&:focus': {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 12px var(--accent-glow)',
          },
        },
      }),
    },
    PasswordInput: {
      defaultProps: { radius: 'md' },
      styles: () => ({
        input: {
          height: '44px',
          backgroundColor: 'var(--bg-elevated)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border-default)',
          transition: 'all 0.3s ease',
          '&:focus': {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 12px var(--accent-glow)',
          },
        },
      }),
    },
    Select: {
      defaultProps: { radius: 'md' },
      styles: () => ({
        input: {
          height: '44px',
          backgroundColor: 'var(--bg-elevated)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border-default)',
          transition: 'all 0.3s ease',
          '&:focus': {
            borderColor: 'var(--accent)',
            boxShadow: '0 0 12px var(--accent-glow)',
          },
        },
      }),
    },
    FileInput: {
      defaultProps: { radius: 'md' },
      styles: () => ({
        input: {
          height: '44px',
          backgroundColor: 'var(--bg-elevated)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border-default)',
        },
      }),
    },
    DateInput: {
      defaultProps: { radius: 'md' },
      styles: () => ({
        input: {
          height: '44px',
          backgroundColor: 'var(--bg-elevated)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border-default)',
        },
      }),
    },
    Table: {
      styles: () => ({
        th: {
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-tertiary)',
          borderBottomColor: 'var(--border-default)',
        },
        td: {
          borderBottomColor: 'var(--border-subtle)',
        },
        tr: {
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: 'var(--bg-hover)',
          },
        },
      }),
    },
    AppShell: {
      styles: () => ({
        navbar: {
          backgroundColor: 'var(--bg-surface)',
          backdropFilter: 'blur(20px)',
          borderColor: 'var(--border-default)',
        },
        header: {
          backgroundColor: 'var(--bg-navbar)',
          backdropFilter: 'blur(16px)',
          borderColor: 'var(--border-default)',
        },
      }),
    },
  },
});

function AdminGuard({ children }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function checkAdmin() {
      try {
        const raw = localStorage.getItem('token');
        const token = raw ? JSON.parse(raw) : null;

        if (!token) {
          window.location.href = '/login';
          return;
        }

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
    <html lang="en" className={`${inter.variable} ${yesteryear.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <ModalsProvider>
            <QueryProvider enablePersistence={false}>
              <NextTopLoader color="#00e5ff" showSpinner={false} height={3} />
              <Toaster position="top-center" richColors theme="dark" />
              <AdminGuard>{children}</AdminGuard>
            </QueryProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
