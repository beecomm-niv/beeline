'use client';

import { Box, Typography } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';

const ReservationCancel = () => {
  return (
    <Box sx={{ height: '100svh', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CancelIcon color='error' sx={{ fontSize: 150 }} />

      <Typography variant='h5'>ההזמנה שלכם בוטלה</Typography>
    </Box>
  );
};

export default ReservationCancel;
