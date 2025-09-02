'use client';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

interface Pallete {
  palettePrimary: string;
  textPrimary: string;
  defaultBackground: string;
}

const palette: Record<'light' | 'dark', Pallete> = {
  light: {
    palettePrimary: '#edc210',
    textPrimary: '#000000',
    defaultBackground: '#f5f5f5',
  },
  dark: {
    palettePrimary: '#edc210',
    textPrimary: '#ffffff',
    defaultBackground: '#27293d',
  },
};

const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      primary: { main: palette[mode].palettePrimary },
      background: {
        default: palette[mode].defaultBackground,
      },

      text: {
        primary: palette[mode].textPrimary,
      },
    },

    typography: {
      fontFamily: 'Assistant, Arial, sans-serif',
    },
  });

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = getTheme('dark');

  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
}
