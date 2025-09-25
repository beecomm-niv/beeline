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
  papper: string;
  textSecondery: string;
}

const hebImplment = (lang: Locale, classValue: string) => (lang === 'he' ? classValue : '');

const palette: Record<'light' | 'dark', Pallete> = {
  dark: {
    palettePrimary: '#1aae6a',
    textPrimary: '#ffffff',
    textSecondery: '#c9c9c9ff',
    defaultBackground: '#121212',
    outlinedBackground: '#bbbbbbff',
    papper: '#1E1E1E',
    palleteSecondery: '#edc210',
  },
  light: {
    palettePrimary: '#edc210',
    textPrimary: '#000000',
    defaultBackground: 'rgb(245, 245, 245)',
    outlinedBackground: '#c7c7c7ff',
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
            color: `#A1A1A1 !important`,
          },
          shrink: {
            transform: hebImplment(lang, 'translate(-14px, 2px) scale(0.75) !important'),
            color: `#A1A1A1 !important`,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: palette[mode].papper,
            borderRadius: 10,
            paddingTop: 4,
          },
        },
      },

      MuiFormLabel: {
        styleOverrides: {
          root: {
            transformOrigin: hebImplment(lang, 'top right !important'),
            right: hebImplment(lang, '0 !important'),
            transform: hebImplment(lang, 'translate(-14px, 18px) scale(1) !important'),
            '&.Mui-focused': {
              transform: hebImplment(lang, 'translate(-14px, 2px) scale(0.75) !important'),
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            '& fieldset': {
              textAlign: hebImplment(lang, 'right'),
              border: 'none',
            },
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
            borderColor: palette[mode].papper,
            width: '100%',
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

      MuiButton: {
        styleOverrides: {
          root: {
            color: palette[mode].textPrimary,
            fontSize: 18,
          },
        },

        defaultProps: {
          variant: 'contained',
        },
      },

      MuiSelect: {
        styleOverrides: {
          icon: {
            left: '0 !important',
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
