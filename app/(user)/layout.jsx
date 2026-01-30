'use client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Yesteryear } from 'next/font/google';
import './globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Header/Navbar';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

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
    Card: {
      defaultProps: {
        radius: 'lg',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'lg',
      },
    },
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
    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

// Create a client
const queryClient = new QueryClient();

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
            <ScrollToTopButton />
            <Navbar />
            {children}
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
