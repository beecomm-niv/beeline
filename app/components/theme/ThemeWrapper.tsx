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
    palettePrimary: '#1976d2',
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

    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: palette[mode].textPrimary,
          },
          shrink: {
            transform: 'translate(-14px, -10px) scale(0.75) !important',
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: '#929292ff',
          },
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: palette[mode].palettePrimary,
            },
          },
        },
      },

      MuiFormLabel: {
        styleOverrides: {
          root: {
            transformOrigin: 'top right !important',
            right: '0 !important',
            transform: 'translate(-14px, 16px) scale(1) !important',
            '&.Mui-focused': {
              transform: 'translate(-14px, -10px) scale(0.75) !important',
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            '& fieldset': {
              textAlign: 'right',
            },
          },
        },
      },
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
