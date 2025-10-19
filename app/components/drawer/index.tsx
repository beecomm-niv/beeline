'use client';

import { Box, List, ListItem, ListItemButton, ListItemIcon, Typography, Drawer as MuiDrawer, IconButton } from '@mui/material';
import { ReactElement, useState } from 'react';

import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import Settings from '@mui/icons-material/SettingsOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuIcon from '@mui/icons-material/Menu';

import { useAppStore } from '@/app/store/appStore-provider';
import { Translate } from '@/app/utils/translate';
import { usePathname, useRouter } from 'next/navigation';
import { useManagementStore } from '@/app/store/management-provider';

import { version } from '../../../package.json';

interface RouteItem {
  path: string;
  icon: ReactElement<any, any>;
  title: keyof Translate;
}

const routes: RouteItem[] = [
  {
    path: 'management',
    icon: <RecentActorsOutlinedIcon />,
    title: 'drawerHomeLabel',
  },
  {
    path: 'management/line-settings',
    icon: <PlaylistAddCheckOutlinedIcon />,
    title: 'drawerLineSettingsLabel',
  },
  {
    path: 'management/settings',
    icon: <Settings />,
    title: 'drawerSettingsLabel',
  },
];

const Drawer = () => {
  const [open, setOpen] = useState(false);
  const translate = useAppStore((s) => s.translate);

  const router = useRouter();
  const path = usePathname();

  const branch = useManagementStore((s) => s.branch);

  const onRoute = (path: string) => {
    setOpen(false);
    router.push('/' + path);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <MuiDrawer open={open} onClose={() => setOpen(false)} slotProps={{ paper: { style: { width: '40%', backgroundColor: '#000000' } } }} anchor='right'>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', padding: '20px 16px 10px 16px', gap: 2 }}>
          <RestaurantIcon fontSize='small' color='primary' />
          <Typography variant='h6' color='primary'>
            {branch.name}
          </Typography>
        </Box>
        <List>
          {routes.map((r) => (
            <ListItem key={r.path}>
              <ListItemButton
                onClick={() => onRoute(r.path)}
                sx={{
                  padding: '15px 10px',
                  backgroundColor: 'transparent',
                  '&.Mui-selected': {
                    backgroundColor: '#2f2d2d',
                  },
                }}
                selected={path === '/' + r.path}
              >
                <ListItemIcon>{r.icon}</ListItemIcon>
                <Typography>{translate[r.title]}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ position: 'absolute', bottom: 5, insetInline: 10 }}>
          <Typography>v{version}</Typography>
        </Box>
      </MuiDrawer>
    </>
  );
};

export default Drawer;
