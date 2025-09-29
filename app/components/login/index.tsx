'use client';

import { useAppStore } from '@/app/store/appStore-provider';
import { AUTH } from '@/app/utils/firebase-client';
import { HttpUtils } from '@/app/utils/http';
import { Button, styled, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

import React from 'react';

const LoginWithMailAndPassword = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();
  const translate = useAppStore((s) => s.translate);
  const prefix = useAppStore((s) => s.urlPrefix);
  const snackbar = useSnackbar();

  const onSubmit = async () => {
    if (!email || !password) {
      return snackbar.enqueueSnackbar('כל השדות חובה', { variant: 'error' });
    }

    const response = await HttpUtils.post<boolean>('/users/login', { email, password });
    if (response.hasError) {
      return snackbar.enqueueSnackbar('שם משתמש או סיסמא לא תקינים', { variant: 'error' });
    }

    await signInWithEmailAndPassword(AUTH, email, password);
    router.replace(`${prefix}management`);
  };

  return (
    <Container>
      <TextField label={translate.loginEmailLabel} variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} id='beeline-user' type='email' />
      <TextField label={translate.loginPasswordLabel} variant='outlined' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} id='beeline-password' type='password' />

      <Button onClick={onSubmit} fullWidth variant='contained'>
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
