'use client';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

interface Pallete {
  palettePrimary: string;
  textPrimary: string;
  defaultBackground: string;
  outlinedBackground: string;
  shrinkColor: string;
}

const hebImplment = (lang: 'he' | 'en', classValue: string) => (lang === 'he' ? classValue : '');

const palette: Record<'light' | 'dark', Pallete> = {
  light: {
    palettePrimary: '#1976d2',
    textPrimary: '#000000',
    defaultBackground: 'rgb(245, 245, 245)',
    outlinedBackground: '#c7c7c7ff',
    shrinkColor: '#000000',
  },
  dark: {
    palettePrimary: '#1976d2',
    textPrimary: '#ffffff',
    defaultBackground: '#000000',
    outlinedBackground: '#4d4d4dff',
    shrinkColor: '#ffffff',
  },
};

const getTheme = (mode: 'light' | 'dark', lang: 'he' | 'en') =>
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
            color: `${palette[mode].textPrimary} !important`,
          },
          shrink: {
            transform: hebImplment(lang, 'translate(-14px, -10px) scale(0.75) !important'),
            color: `${palette[mode].shrinkColor} !important`,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: `${palette[mode].outlinedBackground} !important`,
          },
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #929292ff !important',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #929292ff !important',
            },
          },
        },
      },

      MuiFormLabel: {
        styleOverrides: {
          root: {
            transformOrigin: hebImplment(lang, 'top right !important'),
            right: hebImplment(lang, '0 !important'),
            transform: hebImplment(lang, 'translate(-14px, 16px) scale(1) !important'),
            '&.Mui-focused': {
              transform: hebImplment(lang, 'translate(-14px, -10px) scale(0.75) !important'),
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            '& fieldset': {
              textAlign: hebImplment(lang, 'right'),
            },
          },
        },
      },
    },
  });

export default function ThemeWrapper({ children, lang }: { children: React.ReactNode; lang: 'he' | 'en' }) {
  const theme = getTheme('dark', lang);

  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
}
