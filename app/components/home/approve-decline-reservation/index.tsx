import { ReservationAction } from '@/app/models/reservation';
import { Backdrop, Box, CircularProgress, IconButton, styled, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';

import { SwipeButton } from 'swipe-button';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import useHttpRequest from '@/app/hooks/request';
import { HttpUtils } from '@/app/utils/http';
import { ReservationsCacheUtils } from '@/app/utils/reservations-cache';

interface Props {
  reservation: ReservationAction | null;
  onCancel: () => void;
}

const ApproveOrDeclineReservation = (props: Props) => {
  const theme = useTheme();

  const isApproved = useMemo(() => props.reservation?.status === 'approved', [props.reservation?.status]);
  const { loading, request } = useHttpRequest();

  const onSuccess = () => {
    if (!props.reservation) return;

    request({
      request: () => HttpUtils.post('/reservations', props.reservation),
      onSuccess: () => {
        ReservationsCacheUtils.hide(props.reservation!.reservation.id);
        props.onCancel();
      },
    });
  };

  const onClose = () => {
    if (!loading) {
      props.onCancel();
    }
  };

  return (
    <Backdrop open={!!props.reservation} onClick={onClose} sx={{ flexDirection: 'column', gap: 5, backgroundColor: '#000000c7' }}>
      {props.reservation && (
        <>
          <Box sx={{ position: 'absolute', top: '5%' }}>
            <IconButton onClick={onClose}>
              <CancelIcon sx={{ fontSize: 60 }} />
            </IconButton>
          </Box>
          <Box onClick={(e) => e.stopPropagation()} sx={{ width: '50%', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10 }}>
              <Box>
                <AccountCircleOutlinedIcon />
                <Typography variant='h5'>{props.reservation.reservation.fullName}</Typography>
              </Box>
              <Box>
                <GroupOutlinedIcon />
                <Typography variant='h5'>{props.reservation.reservation.dinners}</Typography>
              </Box>
              <Box>
                <LocalPhoneOutlinedIcon />
                <Typography variant='h5'>{props.reservation.reservation.phone}</Typography>
              </Box>
            </Box>
            <Root onSuccess={onSuccess} dir='ltr' c={isApproved ? theme.palette.primary.main : theme.palette.error.main}>
              <SwipeButton.Rail>
                <Typography variant='h6'>{isApproved ? 'החלק לזימון' : 'החלק לביטול'}</Typography>
              </SwipeButton.Rail>
              <Overlay c={isApproved ? theme.palette.primary.main : theme.palette.error.main}>
                {!loading ? <Typography sx={{ direction: 'rtl' }}>{isApproved ? 'שולח SMS' : 'מבטל הזמנה'}</Typography> : <CircularProgress color='inherit' size={30} />}
              </Overlay>
              <Slider c={isApproved ? theme.palette.primary.main : theme.palette.error.main}>
                <Typography sx={{ color: 'text.primary' }}>{'>'}</Typography>
              </Slider>
            </Root>
          </Box>
        </>
      )}
    </Backdrop>
  );
};

const Root = styled(SwipeButton.Root)<{ c: string }>((props) => ({
  backgroundColor: `transparent !important`,
  color: `${props.c} !important`,
  border: `1px solid ${props.c} !important`,
  height: '70px !important',
}));

const Slider = styled(SwipeButton.Slider)<{ c: string }>((props) => ({
  backgroundColor: `${props.c} !important`,
  width: '70px !important',
}));

const Overlay = styled(SwipeButton.Overlay)<{ c: string }>((props) => ({
  backgroundColor: `${props.c} !important`,
}));

export default ApproveOrDeclineReservation;
