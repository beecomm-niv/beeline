import { Box, TextField } from '@mui/material';

const LoginPage = () => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <TextField
          label='משתמש'
          variant='outlined'
          sx={{
            '& .MuiFormLabel-root': {
              transformOrigin: 'top right',
              right: 0,
              transform: 'translate(-14px, 16px) scale(1)',
              '&.Mui-focused': {
                transform: 'translate(-14px, -10px) scale(0.75)',
              },
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(-14px, -10px) scale(0.75) !important',
            },
            '& .MuiInputBase-root': {
              '& fieldset': {
                textAlign: 'right',
              },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default LoginPage;
