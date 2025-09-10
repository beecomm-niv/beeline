'use client';

import { HttpUtils } from '@/app/utils/http';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

import React from 'react';

const LoginWithMailAndPassword = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();

  const onSubmit = async () => {
    if (!email || !password) {
      return window.alert('יש להזין שם משתמש וסיסמא');
    }

    const response = await HttpUtils.post<boolean>('/users/login', { email, password });
    if (response.hasError) {
      return window.alert('שם משתמש או סיסמא שגויים');
    }

    router.replace('/management');
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: 2,
          width: '30%',
          margin: '0 auto',
        }}
      >
        <TextField label='מייל' variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} id='beeline-user' type='email' />
        <TextField label='סיסמא' variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} id='beeline-password' type='password' />

        <Button onClick={onSubmit} fullWidth variant='contained'>
          התחברות
        </Button>
      </Box>
    </div>
  );
};

export default LoginWithMailAndPassword;
