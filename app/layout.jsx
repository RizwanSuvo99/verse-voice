import '@mantine/core/styles.css';
import { Yesteryear } from 'next/font/google';
import './globals.css';

import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Header/Navbar';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';

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
});

export const metadata = {
  title: 'Verse Voice Blog',
  description: 'A blog website created by Tech & Skills',
};

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
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        </MantineProvider>
      </body>
    </html>
  );
}
