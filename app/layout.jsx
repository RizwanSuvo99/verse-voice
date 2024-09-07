import '@mantine/core/styles.css';
import './globals.css';

import Navbar from '@/components/Header/Navbar';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  focusRing: 'never',
  black: '#344161',
  fontFamily: 'Noto Sans, sans-serif',
  cursorType: 'pointer',
  defaultGradient: {
    from: '#0ea5ea',
    to: '#0bd1d1',
    deg: 90,
  },
});

export const metadata = {
  title: 'Verse Voice Blog',
  description: 'A blog website created by Tech & Skills',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
          </>
        </MantineProvider>
      </body>
    </html>
  );
}
