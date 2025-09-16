'use client';

import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const TIMEOUT_LENGTH = 10;

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

  const onChange = (val: string, index: number, currentRef: HTMLInputElement | null, nextRef: HTMLInputElement | null) => {
    setCode((c) => {
      const clone = [...c];
      clone[index] = val;
      return clone;
    });

    if (val) {
      nextRef?.focus();
      if (!nextRef) {
        currentRef?.blur();
      }
    }
  };

  const onSetTimer = () => {
    let value = TIMEOUT_LENGTH;
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
    props.onResend();
    onSetTimer();
  };

  const onSubmit = () => {
    props.onSubmit(code.join(''));
  };

  return (
    <Box
      sx={{
        height: '100svh',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        position: 'relative',
        paddingTop: 10,
      }}
    >
      <Typography variant='h4'>אימות טלפון</Typography>

      <Typography color='text.secondary' fontSize={18}>
        נשלח קוד אימות למספר {props.phone}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, marginTop: 5, direction: 'ltr' }}>
        <Input inputRef={ref1} value={code[0]} onChange={(e) => onChange(e.target.value, 0, ref1.current, ref2.current)} />
        <Input inputRef={ref2} value={code[1]} onChange={(e) => onChange(e.target.value, 1, ref2.current, ref3.current)} />
        <Input inputRef={ref3} value={code[2]} onChange={(e) => onChange(e.target.value, 2, ref3.current, ref4.current)} />
        <Input inputRef={ref4} value={code[3]} onChange={(e) => onChange(e.target.value, 3, ref4.current, null)} />
      </Box>

      <Box sx={{ marginTop: 2 }}>
        {timer > 0 && <Typography>לא קיבלתם קוד ? נשלח שוב בעוד 0:{timer.toString().padStart(2, '0')}</Typography>}
        {timer === 0 && (
          <Button onClick={onResend} disabled={props.isLoading} variant='outlined'>
            שלח שוב
          </Button>
        )}
      </Box>

      <Box sx={{ position: 'fixed', bottom: 0, width: '100%', padding: 2 }}>
        <Button fullWidth variant='contained' onClick={onSubmit} disabled={props.isLoading}>
          שליחה
        </Button>
      </Box>
    </Box>
  );
};

const Input = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: '100%',
    paddingTop: 0,
  },
  '& .MuiInputBase-input': {
    height: 30,
    width: 40,
    borderRadius: '100%',
    textAlign: 'center',
    fontSize: 25,
  },
});
