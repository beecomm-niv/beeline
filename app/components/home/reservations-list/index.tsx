import { Reservation } from '@/app/models/reservation';
import { Box, Button, Divider, styled, Typography } from '@mui/material';

import DoneIcone from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  reservations: Reservation[];
}

const ReservationsList = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 2, paddingTop: 2, flexDirection: 'column' }}>
      {props.reservations.map((r) => (
        <Box key={r.id} sx={{ width: '70%' }}>
          <Item>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <Typography variant='h6'>{r.fullName}</Typography>
              <Typography color='primary' fontSize={16} sx={{ marginTop: '-5px' }}>
                שם
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <Typography variant='h6'>{r.phone}</Typography>
              <Typography color='primary' fontSize={16} sx={{ marginTop: '-5px' }}>
                טלפון
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <Typography variant='h6'>{r.dinners}</Typography>
              <Typography color='primary' fontSize={16} sx={{ marginTop: '-5px' }}>
                סועדים
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <Typography variant='h6'>0</Typography>
              <Typography color='primary' fontSize={16} sx={{ marginTop: '-5px' }}>
                המתנה
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', gap: 1 }}>
              <Button variant='contained' color='success'>
                <DoneIcone sx={{ color: 'text.primary' }} />
              </Button>
              <Button variant='outlined' color='error'>
                <DeleteIcon />
              </Button>
            </Box>
          </Item>

          <Divider sx={{ borderStyle: 'dashed' }} />
        </Box>
      ))}
    </Box>
  );
};

const Item = styled('div')({
  width: '100%',
  margin: 'auto',
  padding: '20px 30px',
  display: 'flex',
});

export default ReservationsList;
