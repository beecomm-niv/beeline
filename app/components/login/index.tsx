'use client';

import { useAppStore } from '@/app/store/appStore-provider';
import { AUTH } from '@/app/utils/firebase-client';
import { HttpUtils } from '@/app/utils/http';
import { Button, styled, TextField } from '@mui/material';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react';

const LoginWithMailAndPassword = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();
  const translate = useAppStore((s) => s.translate);
  const lang = useAppStore((s) => s.lang);

  const onSubmit = async () => {
    if (!email || !password) {
      return window.alert('Email and Password are required !');
    }

    const response = await HttpUtils.post<boolean>('/users/login', { email, password });
    if (response.hasError) {
      return window.alert('Email or Password are not associated with any user');
    }

    await signInWithEmailAndPassword(AUTH, email, password);
    router.replace(`/${lang}/management`);
  };

  useEffect(() => {
    signOut(AUTH);
  }, []);

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
