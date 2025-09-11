'use client';

import { Locale } from '@/app/models/locales';
import { useAppStore } from '@/app/store/appStore-provider';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';

interface Pallete {
  palettePrimary: string;
  palleteSecondery: string;
  textPrimary: string;
  defaultBackground: string;
  outlinedBackground: string;
  shrinkColor: string;
  papper: string;
  textSecondery: string;
}

const hebImplment = (lang: Locale, classValue: string) => (lang === 'he' ? classValue : '');

const palette: Record<'light' | 'dark', Pallete> = {
  dark: {
    palettePrimary: '#1976d2',
    textPrimary: '#ffffff',
    textSecondery: 'gray',
    defaultBackground: '#000000',
    outlinedBackground: '#bbbbbbff',
    shrinkColor: '#ffffff',
    papper: '#212121',
    palleteSecondery: '#edc210',
  },
  light: {
    palettePrimary: '#1976d2',
    textPrimary: '#000000',
    defaultBackground: 'rgb(245, 245, 245)',
    outlinedBackground: '#c7c7c7ff',
    shrinkColor: '#000000',
    papper: '#d4d4d4',
    palleteSecondery: '#edc210',
    textSecondery: 'gray',
  },
};

const getTheme = (mode: 'light' | 'dark', lang: Locale) =>
  createTheme({
    palette: {
      primary: { main: palette[mode].palettePrimary },
      background: {
        default: palette[mode].defaultBackground,
      },

      text: {
        primary: palette[mode].textPrimary,
        secondary: palette[mode].textSecondery,
      },

      mode,
    },

    typography: {
      fontFamily: 'Assistant, Arial, sans-serif',
      fontSize: 16,
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

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: palette[mode].textPrimary,
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: '15%',
            backgroundColor: palette[mode].papper,
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            border: '1px solid ' + palette[mode].papper,
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          track: {
            backgroundColor: palette[mode].textPrimary,
          },
        },
      },

      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: palette[mode].papper,
            '&.Mui-focused': {
              backgroundColor: `${palette[mode].papper} !important`,
            },
            '&:hover': {
              backgroundColor: `${palette[mode].papper} !important`,
            },
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            fontSize: 18,
            color: palette[mode].textPrimary,
            '&.Mui-selected': {
              color: palette[mode].textPrimary,
            },
          },
        },
      },
    },
  });

export default function ThemeWrapper({ children, lang }: { children: React.ReactNode; lang: Locale }) {
  const mode = useAppStore((s) => s.mode);
  const setMode = useAppStore((s) => s.setMode);

  const muiTheme = getTheme(mode, lang);

  useEffect(() => {
    let mode = localStorage.getItem('theme') || 'dark';

    if (mode !== 'light' && mode !== 'dark') {
      mode = 'dark';
    }

    setMode(mode as any);
  }, [setMode]);

  return (
    <ThemeProvider theme={muiTheme}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
}
