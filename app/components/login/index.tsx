'use client';

import { useAppStore } from '@/app/store/appStore-provider';
import { FirebaseClientUtils } from '@/app/utils/firebase-client';
import { HttpUtils } from '@/app/utils/http';
import { Box, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';

import React from 'react';

const LoginWithMailAndPassword = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();
  const translate = useAppStore((s) => s.translate);

  const onSubmit = async () => {
    if (!email || !password) {
      return window.alert('Email and Password are required !');
    }

    const response = await HttpUtils.post<boolean>('/users/login', { email, password });
    if (response.hasError) {
      return window.alert('Email or Password are not associated with any user');
    }

    await FirebaseClientUtils.signIn(email, password);
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
          width: '40%',
          margin: '0 auto',
        }}
      >
        <TextField label={translate.loginEmailLabel} variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} id='beeline-user' type='email' />
        <TextField label={translate.loginPasswordLabel} variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} id='beeline-password' type='password' />

        <Button onClick={onSubmit} fullWidth variant='contained'>
          {translate.loginSubmitButton}
        </Button>
      </Box>
    </div>
  );
};

export default LoginWithMailAndPassword;
