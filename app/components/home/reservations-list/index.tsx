import { Reservation } from '@/app/models/reservation';
import { ListItemButton, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarmOutlined';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhoneOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppStore } from '@/app/store/appStore-provider';
import { useMemo } from 'react';

interface Props {
  reservations: Reservation[];
}

const ReservationsList = (props: Props) => {
  const lang = useAppStore((s) => s.lang);
  const align = useMemo(() => (lang === 'he' ? 'right' : 'left'), [lang]);

  return (
    <TableContainer sx={{ padding: '10px 20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <Header align={align}>
              <AccountCircleIcon />
            </Header>
            <Header align={align}>
              <LocalPhoneIcon />
            </Header>
            <Header align={align}>
              <GroupIcon />
            </Header>
            <Header align={align}>
              <AccessAlarmIcon />
            </Header>
            <Header sx={{ width: '0' }} align={align}></Header>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.reservations.map((r) => (
            <TableRow key={r.id}>
              <Body align={align}>{r.fullName}</Body>
              <Body align={align}>{r.phone}</Body>
              <Body align={align}>{r.dinners}</Body>
              <Body align={align}>4 דק</Body>
              <Body align={align} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ListItemButton>
                  <Typography color='primary' fontSize={20}>
                    זימון
                  </Typography>
                </ListItemButton>
                <ListItemButton>
                  <Typography color='text.secondary' fontSize={20}>
                    ביטול
                  </Typography>
                </ListItemButton>
              </Body>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Header = styled(TableCell)<{ align: 'right' | 'left' }>((props) => ({
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: props.align,
}));

const Body = styled(TableCell)<{ align: 'right' | 'left' }>((props) => ({
  fontSize: 20,
  textAlign: props.align,
}));

export default ReservationsList;
