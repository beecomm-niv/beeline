import { CustomerReservationStatus, Reservation } from '@/app/models/reservation';
import { Box, Button, Divider, styled, Typography } from '@mui/material';

import DoneIcone from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import useHttpRequest from '@/app/hooks/request';
import { HttpUtils } from '@/app/utils/http';

interface Props {
  reservations: Reservation[];
}

const ReservationsList = (props: Props) => {
  const { loading, request } = useHttpRequest();

  const onChangeStatus = (reservation: Reservation, status: CustomerReservationStatus) => {
    if (loading) return;

    request({
      request: () => HttpUtils.post('/reservations', { reservation, status }),
    });
  };

  return (
    <Container>
      {props.reservations.map((r) => (
        <Box key={r.id} width='70%'>
          <Item>
            <ItemContainer>
              <Typography variant='h6'>{r.fullName}</Typography>
              <Typography color='primary' fontSize={16} marginTop='-5px'>
                שם
              </Typography>
            </ItemContainer>
            <ItemContainer>
              <Typography variant='h6'>{r.phone}</Typography>
              <Typography color='primary' fontSize={16} marginTop='-5px'>
                טלפון
              </Typography>
            </ItemContainer>
            <ItemContainer>
              <Typography variant='h6'>{r.dinners}</Typography>
              <Typography color='primary' fontSize={16} marginTop='-5px'>
                סועדים
              </Typography>
            </ItemContainer>
            <ItemContainer>
              <Typography variant='h6'>0</Typography>
              <Typography color='primary' fontSize={16} marginTop='-5px'>
                המתנה
              </Typography>
            </ItemContainer>
            <ButtonsContainer>
              <Button variant='contained' color='success' onClick={() => onChangeStatus(r, 'approved')}>
                <DoneIcone sx={{ color: 'text.primary' }} />
              </Button>
              <Button variant='outlined' color='error' onClick={() => onChangeStatus(r, 'cancel')}>
                <DeleteIcon />
              </Button>
            </ButtonsContainer>
          </Item>

          <Divider sx={{ borderStyle: 'dashed' }} />
        </Box>
      ))}
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: 10,
  paddingTop: 20,
  flexDirection: 'column',
});

const Item = styled('div')({
  width: '100%',
  margin: 'auto',
  padding: '20px 30px',
  display: 'flex',
});

const ItemContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
});

const ButtonsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  gap: 10,
});

export default ReservationsList;
