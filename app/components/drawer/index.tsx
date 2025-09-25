'use client';

import { Card, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { ReactElement } from 'react';

import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { useAppStore } from '@/app/store/appStore-provider';
import { Translate } from '@/app/utils/translate';
import { usePathname, useRouter } from 'next/navigation';

interface RouteItem {
  path: string;
  icon: ReactElement<any, any>;
  title: keyof Translate;
}

const routes: RouteItem[] = [
  {
    path: 'management',
    icon: <HomeOutlinedIcon />,
    title: 'drawerHomeLabel',
  },
  {
    path: 'management/line-settings',
    icon: <PlaylistAddCheckOutlinedIcon />,
    title: 'drawerLineSettingsLabel',
  },
];

interface Props {
  branchName: string;
}

const Drawer = (props: Props) => {
  const prefix = useAppStore((s) => s.urlPrefix);
  const translate = useAppStore((s) => s.translate);

  const router = useRouter();
  const path = usePathname();

  const onRoute = (path: string) => {
    router.push(prefix + path);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Typography variant='h6' sx={{ padding: '20px 16px 10px 16px' }}>
        {props.branchName}
      </Typography>
      <List>
        {routes.map((r) => (
          <ListItem key={r.path}>
            <ListItemButton onClick={() => onRoute(r.path)} selected={`/${r.path}` === path}>
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
