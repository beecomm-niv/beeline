'use client';

import { Box, Button, styled, TextField, Typography } from '@mui/material';
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
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState(TIMEOUT_LENGTH);

  const ref1 = useRef<HTMLInputElement | null>(null);
  const ref2 = useRef<HTMLInputElement | null>(null);
  const ref3 = useRef<HTMLInputElement | null>(null);
  const ref4 = useRef<HTMLInputElement | null>(null);

  const timeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const onChange = (val: string, index: number, currentRef: HTMLInputElement | null, nextRef: HTMLInputElement | null, prevRef: HTMLInputElement | null) => {
    setCode((c) => {
      const clone = [...c];
      clone[index] = val.at(-1) || '';
      return clone;
    });

    if (val) {
      nextRef?.focus();
      if (!nextRef) {
        currentRef?.blur();
      }
    } else {
      prevRef?.focus();
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
      props.onSubmit(code.join(''));
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100svh', width: '100%', alignItems: 'center', flexDirection: 'column', padding: '20% 5% 0 5%', gap: 3 }}>
      <LockIcon color='primary' sx={{ fontSize: 70 }} />
      <Typography variant='h6' textAlign='center'>
        אנא הכנס את קוד האימות שנשלח אלייך בהודעת SMS
      </Typography>

      <Box>
        <Box sx={{ display: 'flex', gap: 2, direction: 'ltr' }}>
          <Input inputRef={ref1} value={code[0]} onChange={(e) => onChange(e.target.value, 0, ref1.current, ref2.current, null)} />
          <Input inputRef={ref2} value={code[1]} onChange={(e) => onChange(e.target.value, 1, ref2.current, ref3.current, ref1.current)} />
          <Input inputRef={ref3} value={code[2]} onChange={(e) => onChange(e.target.value, 2, ref3.current, ref4.current, ref2.current)} />
          <Input inputRef={ref4} value={code[3]} onChange={(e) => onChange(e.target.value, 3, ref4.current, null, ref3.current)} />
        </Box>

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

const Input = styled(TextField)({
  '& .MuiInputBase-root': {
    paddingTop: 0,
  },
  '& .MuiInputBase-input': {
    height: 30,
    width: 40,
    textAlign: 'center',
    fontSize: 25,
  },
});
