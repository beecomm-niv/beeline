'use client';

import { Box, Button, Card, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import LockIcon from '@mui/icons-material/Lock';

const TIMEOUT_LENGTH = 59;

interface Props {
  phone: string;
  onSubmit: (code: string) => void;
  isLoading: boolean;
  onResend: () => void;
}

export const OTP = (props: Props) => {
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState(TIMEOUT_LENGTH);

  const timeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const ref = useRef<HTMLInputElement | null>(null);
  const isFirstTry = useRef(true);

  const onChange = (code: string) => {
    if (!isNaN(+code) && code.length <= 4) {
      setCode(code);

      if (code.length === 4) {
        ref.current?.blur();
        if (isFirstTry.current) {
          onSubmit();
          isFirstTry.current = false;
        }
      }
    }
  };

  const onSetTimer = () => {
    let value = TIMEOUT_LENGTH;
    setTimer(value);

    timeout.current = setInterval(() => {
      value--;
      setTimer(value);

      if (!value) {
        clearInterval(timeout.current);
      }
    }, 1000);
  };

  useEffect(() => {
    ref.current?.focus();
    onSetTimer();

    return () => clearInterval(timeout.current);
  }, []);

  const onResend = () => {
    if (!props.isLoading) {
      props.onResend();
      onSetTimer();
    }
  };

  const onSubmit = () => {
    if (!props.isLoading) {
      props.onSubmit(code);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100svh', width: '100%', alignItems: 'center', flexDirection: 'column', padding: '20% 5% 0 5%', gap: 3 }}>
      <LockIcon color='primary' sx={{ fontSize: 70 }} />
      <Typography variant='h6' textAlign='center'>
        אנא הכנס את קוד האימות שנשלח אלייך בהודעת SMS
      </Typography>

      <Box>
        <Box sx={{ display: 'flex', gap: 2, direction: 'ltr' }} onClick={() => ref.current?.focus()}>
          {[1, 2, 3, 4].map((c) => (
            <Card key={c} sx={{ padding: 4, height: 30, width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10%' }}>
              <Typography fontSize={25}>{code.at(c - 1) || ''}</Typography>
            </Card>
          ))}
        </Box>

        <input
          style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, opacity: 0 }}
          ref={ref}
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          onChange={(e) => onChange(e.target.value)}
        />

        <Button variant='contained' fullWidth sx={{ borderRadius: '10px', marginTop: 4 }} onClick={onSubmit} disabled={props.isLoading}>
          שליחה
        </Button>
      </Box>

      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Typography color='text.secondary'>לא קיבלתם קוד ? ניתן לשלוח שוב בעוד 0:{timer.toString().padStart(2, '0')}</Typography>
        <Button onClick={onResend} color='primary' variant='outlined' fullWidth={false} sx={{ marginTop: 1 }} disabled={timer > 0 || props.isLoading}>
          <Typography color={timer > 0 || props.isLoading ? undefined : 'primary'}>שלח שוב</Typography>
        </Button>
      </Box>
    </Box>
  );
};
