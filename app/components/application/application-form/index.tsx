'use client';

import { Branch } from '@/app/models/branch';
import { ReservationApplication } from '@/app/models/reservation';
import { StorageUtils } from '@/app/utils/storage';
import { Box, Button, Divider, MenuItem, Select, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';

interface CacheUser {
  name: string;
  surName: string;
  phone: string;
}

interface Props {
  branch: Branch;
  onSendOTP: (application: ReservationApplication) => void;
  isLoading: boolean;
}

const ApplicationForm = (props: Props) => {
  const dinners = useRef<number[]>((props.branch.lines || []).reduce<number[]>((prev, line) => prev.concat(line.dinnersRange), []));
  const snackbar = useSnackbar();

  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [phone, setPhone] = useState('');

  const [selectedDinners, setSelectedDinners] = useState<string>('');

  useEffect(() => {
    const user: CacheUser = StorageUtils.getItem('user', true);
    if (user) {
      setName(user.name);
      setSurName(user.surName);
      setPhone(user.phone);
    }
  }, []);

  const onSubmit = async () => {
    if (!name || !surName || !phone || !selectedDinners) {
      return snackbar.enqueueSnackbar('כל השדות חובה', { variant: 'error' });
    }

    const storageValue: CacheUser = {
      name,
      phone,
      surName,
    };

    StorageUtils.setItem('user', storageValue);

    props.onSendOTP({
      branchId: undefined!,
      dinners: +selectedDinners,
      fullName: `${name} ${surName}`,
      phone,
    });
  };

  return (
    <Box sx={{ padding: '0 5%' }}>
      <Box sx={{ width: '100%', textAlign: 'center', position: 'relative' }}>
        <Box sx={{ position: 'absolute', height: '100%', width: '100%', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h4'>{props.branch.name}</Typography>
        </Box>
        <Image alt='' src={props.branch.image || ''} width={300} height={300} style={{ borderRadius: '0 0 10px 10px', filter: 'brightness(50%)' }} priority />
      </Box>

      <Box sx={{ width: '100%', marginTop: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant='h5' textAlign='center'>
          הצטרף לרשימת ההמתנה
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 1 }}>
          <TextField label='שם פרטי' value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label='שם משפחה' value={surName} onChange={(e) => setSurName(e.target.value)} />
        </Box>

        <TextField label='טלפון' value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Divider>כמה סועדים ?</Divider>
        <Select fullWidth value={selectedDinners} onChange={(e) => setSelectedDinners(e.target.value)}>
          {dinners.current.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>

        <Button variant='contained' sx={{ borderRadius: '10px', marginTop: 2 }} onClick={onSubmit} disabled={props.isLoading}>
          הרשמה
        </Button>
      </Box>
    </Box>
  );
};

export default ApplicationForm;
