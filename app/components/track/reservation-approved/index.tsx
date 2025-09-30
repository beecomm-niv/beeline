'use client';

import { Box, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ReservationApproved = () => {
  return (
    <Box sx={{ height: '100svh', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CheckCircleIcon color='primary' sx={{ fontSize: 150 }} />

      <Typography variant='h5'>ההזמנה שלכם מוכנה !</Typography>
    </Box>
  );
};

export default ReservationApproved;
