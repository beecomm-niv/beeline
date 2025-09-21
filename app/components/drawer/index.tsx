'use client';

import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, Drawer as MuiDrawer, styled, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';

import { useAppStore } from '@/app/store/appStore-provider';
import { Translate } from '@/app/utils/translate';
import { useRouter } from 'next/navigation';

interface RouteItem {
  path: string;
  icon: ReactElement<any, any>;
  title: keyof Translate;
}

const routes: RouteItem[] = [
  {
    path: 'management',
    icon: <HomeIcon />,
    title: 'drawerHomeLabel',
  },
  {
    path: 'management/settings',
    icon: <SettingsIcon />,
    title: 'drawerSettingsLabel',
  },
];

const Drawer = () => {
  const lang = useAppStore((s) => s.lang);
  const prefix = useAppStore((s) => s.urlPrefix);
  const translate = useAppStore((s) => s.translate);
  const mode = useAppStore((s) => s.mode);
  const setMode = useAppStore((s) => s.setMode);

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onRoute = (path: string) => {
    router.push(prefix + path);
    setOpen(false);
  };

  return (
    <>
      <AppBar>
        <IconButton onClick={() => setOpen((o) => !o)}>
          <MenuIcon />
        </IconButton>

        <Typography fontSize={18}>מסעדת ביקום</Typography>
        <Mode>
          <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>{mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}</IconButton>
        </Mode>
      </AppBar>

      <Divider />
      <MuiDrawer anchor={lang === 'he' ? 'right' : 'left'} open={open} onClose={() => setOpen(false)}>
        <List>
          {routes.map((r) => (
            <ListItem key={r.path}>
              <ListItemButton onClick={() => onRoute(r.path)}>
                <ListItemIcon>{r.icon}</ListItemIcon>
                <Typography variant='h6'>{translate[r.title]}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MuiDrawer>
    </>
  );
};

const AppBar = styled('div')({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: 8,
  padding: 10,
  paddingBottom: 15,
  position: 'relative',
});

const Mode = styled('div')({
  position: 'absolute',
  insetInlineEnd: 0,
  padding: '0 10px',
});

export default Drawer;
