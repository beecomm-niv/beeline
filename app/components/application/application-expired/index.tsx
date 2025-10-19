import { Box, Typography } from '@mui/material';

const ApplicationExpired = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant='h2'>😞</Typography>
      <Typography variant='h4' textAlign='center' color='error' marginTop={2}>
        התוקף של האסימון פג
      </Typography>
      <Typography variant='h6'>אנא סרקו את ה QR מחדש כדי להמשיך</Typography>
    </Box>
  );
};

export default ApplicationExpired;
