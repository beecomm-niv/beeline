'use client';

import { FirebaseClientUtils } from '@/app/utils/firebase-client';
import { HttpUtils } from '@/app/utils/http';
import { Box, Button, styled, TextField } from '@mui/material';
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

    await FirebaseClientUtils.signIn(email, password);
    router.replace('/management');
  };

  return (
    <Container>
      <TextField label='מייל' variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} id='beeline-user' type='email' />
      <TextField label='סיסמא' variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} id='beeline-password' type='password' />

      <Button onClick={onSubmit} fullWidth variant='contained'>
        התחברות
      </Button>
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
  gap: 20,
  width: '40%',
  margin: '0 auto',
});

export default LoginWithMailAndPassword;
