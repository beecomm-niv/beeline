import { Box, Typography } from '@mui/material';

const NoBranch = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100svh',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h3'>ברוכים הבאים ל BeeLine !</Typography>
      <Typography variant='h6' color='error'>
        כדי שנמשיך בתהליך, יש לדבר עם התמיכה של ביקום בטלפון: 0547631163
      </Typography>
      <Typography variant='h6'>בהצלחה 😄</Typography>
    </Box>
  );
};

export default NoBranch;
