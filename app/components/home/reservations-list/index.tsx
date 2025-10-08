import { Reservation, ReservationAction } from '@/app/models/reservation';
import { Box, ListItemButton, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { useAppStore } from '@/app/store/appStore-provider';
import { useMemo } from 'react';
import { moment } from '@/app/utils/dayjs';

interface Props {
  reservations: Reservation[];
  setReservationAction: (a: ReservationAction) => void;
}

const ReservationsList = (props: Props) => {
  const lang = useAppStore((s) => s.lang);
  const align = useMemo(() => (lang === 'he' ? 'right' : 'left'), [lang]);

  return (
    <TableContainer sx={{ marginTop: 2 }}>
      <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography variant='h3'>{props.reservations.length}</Typography>
        <Typography color='text.secondary' fontSize={16}>
          הזמנות
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <Header align={align} sx={{ width: '20%' }}>
              לקוח
            </Header>
            <Header align={align} sx={{ width: '20%' }}>
              טלפון
            </Header>
            <Header align={align} sx={{ width: '20%' }}>
              סועדים
            </Header>
            <Header align={align} sx={{ width: '20%' }}>
              זמן המתנה
            </Header>
            <Header align={align} sx={{ width: '20%' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.reservations.map((r) => (
            <TableRow key={r.id}>
              <Body align={align}>{r.fullName}</Body>
              <Body align={align}>{r.phone}</Body>
              <Body align={align}>{r.dinners}</Body>
              <Body align={align}>{moment().diff(r.ts, 'minutes')} דק</Body>
              <Body align={align} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ListItemButton onClick={() => props.setReservationAction({ reservation: r, status: 'approved' })} sx={{ justifyContent: 'center' }}>
                  <Typography color='primary' fontSize={20}>
                    זימון
                  </Typography>
                </ListItemButton>
                <ListItemButton onClick={() => props.setReservationAction({ reservation: r, status: 'cancel' })} sx={{ justifyContent: 'center' }}>
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

const Header = styled(TableCell)<{ align: 'right' | 'left'; w?: string }>((props) => ({
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: props.align,
}));

const Body = styled(TableCell)<{ align: 'right' | 'left' }>((props) => ({
  fontSize: 20,
  textAlign: props.align,
}));

export default ReservationsList;
