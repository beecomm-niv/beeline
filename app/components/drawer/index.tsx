'use client';

import { Box, Card, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { ReactElement } from 'react';

import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import Settings from '@mui/icons-material/SettingsOutlined';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import { useAppStore } from '@/app/store/appStore-provider';
import { Translate } from '@/app/utils/translate';
import { usePathname, useRouter } from 'next/navigation';
import { useManagementStore } from '@/app/store/management-provider';

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
  const translate = useAppStore((s) => s.translate);

  const router = useRouter();
  const path = usePathname();

  const branch = useManagementStore((s) => s.branch);

  const onRoute = (path: string) => {
    router.push('/' + path);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', padding: '20px 16px 10px 16px', gap: 2 }}>
        <RestaurantIcon fontSize='small' color='primary' />
        <Typography variant='h6' color='primary'>
          {branch.name}
        </Typography>
      </Box>
      <List>
        {routes.map((r) => (
          <ListItem key={r.path}>
            <ListItemButton onClick={() => onRoute(r.path)} selected={`/${r.path}` === path} sx={{ padding: '15px 10px' }}>
              <ListItemIcon>{r.icon}</ListItemIcon>
              <Typography>{translate[r.title]}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Drawer;
