'use client';

import useHttpRequest from '@/app/hooks/request';
import { useAppStore } from '@/app/store/appStore-provider';
import { AUTH } from '@/app/utils/firebase-client';
import { HttpUtils } from '@/app/utils/http';
import { Button, styled, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

import React, { useState } from 'react';
import { OTP } from '../otp';

const LoginWithMailAndPassword = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [accessToken, setAccessToken] = useState('');

  const router = useRouter();
  const translate = useAppStore((s) => s.translate);
  const snackbar = useSnackbar();
  const { loading, request } = useHttpRequest();

  const onSubmit = async () => {
    if (!email || !password) {
      return snackbar.enqueueSnackbar('כל השדות חובה', { variant: 'error' });
    }

    request({
      request: () => HttpUtils.post<string>('/users/login', { email, password }),
      onSuccess: setAccessToken,
    });
  };

  const onTestOTP = (code: string) => {
    request({
      request: () =>
        HttpUtils.post(
          '/users/test',
          { code },
          {
            headers: {
              access_token: accessToken,
            },
          }
        ),
      onSuccess: async () => {
        await signInWithEmailAndPassword(AUTH, email, password);
        router.replace(`/management`);
      },
    });
  };

  const onResend = () => {
    request({
      request: () =>
        HttpUtils.post(
          '/users/resend',
          {},
          {
            headers: {
              access_token: accessToken,
            },
          }
        ),
    });
  };

  if (accessToken) {
    return <OTP isLoading={loading} onResend={onResend} onSubmit={onTestOTP} phone='' />;
  }

  return (
    <Container>
      <TextField label={translate.loginEmailLabel} variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} id='beeline-user' type='email' />
      <TextField label={translate.loginPasswordLabel} variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} id='beeline-password' type='password' />

      <Button onClick={onSubmit} fullWidth variant='contained' disabled={loading}>
        {translate.loginSubmitButton}
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
  gap: 15,
  width: '40%',
  margin: '0 auto',
});

export default LoginWithMailAndPassword;
