'use client';

import { useAppStore } from '@/app/hooks/useAppStore';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, Drawer as MuiDrawer, styled, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

interface RouteItem {
  path: string;
  icon: ReactElement<any, any>;
  title: string;
}

const routes: RouteItem[] = [
  {
    path: 'settings',
    icon: <SettingsIcon />,
    title: 'הגדרות',
  },
];

const Drawer = () => {
  const lang = useAppStore((s) => s.lang);

  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar>
        <IconButton onClick={() => setOpen((o) => !o)}>
          <MenuIcon />
        </IconButton>

        <Typography fontSize={18}>מסעדת ביקום</Typography>
      </AppBar>

      <Divider />
      <MuiDrawer anchor={lang === 'he' ? 'right' : 'left'} open={open} onClose={() => setOpen(false)}>
        <List>
          {routes.map((r) => (
            <ListItem key={r.path}>
              <ListItemButton>
                <ListItemIcon>{r.icon}</ListItemIcon>
                <Typography variant='h6'>{r.title}</Typography>
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
});

export default Drawer;
