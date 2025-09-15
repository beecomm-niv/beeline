import useHttpRequest from '@/app/hooks/request';
import { Branch } from '@/app/models/branch';
import { ReservationApplication } from '@/app/models/reservation';
import { HttpUtils } from '@/app/utils/http';
import { Box, Button, Divider, MenuItem, Select, TextField } from '@mui/material';
import { useRef, useState } from 'react';

interface Props {
  branch: Branch;
  setToken: (token: string) => void;
  setApplication: (a: ReservationApplication) => void;
}

const ApplicationForm = (props: Props) => {
  const dinners = useRef<number[]>((props.branch.lines || []).reduce<number[]>((prev, line) => prev.concat(line.dinnersRange), []));

  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [phone, setPhone] = useState('');

  const [selectedDinners, setSelectedDinners] = useState<string>('');

  const { loading, request } = useHttpRequest();

  const onSubmit = async () => {
    if (!name || !surName || !phone || !selectedDinners) {
      return window.alert('כל השדות חובה');
    }

    const application: ReservationApplication = {
      branchId: props.branch.id,
      dinners: selectedDinners,
      fullName: `${name} ${surName}`,
      phone,
    };

    request({
      request: () => HttpUtils.post<string>('/reservations/application/create', application),
      onSuccess: (res) => {
        props.setToken(res);
        props.setApplication(application);
      },
    });
  };

  return (
    <Box
      sx={{
        height: '100svh',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        padding: '0 10px',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          gap: 2,
        }}
      >
        <TextField label='שם פרטי' value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label='שם משפחה' value={surName} onChange={(e) => setSurName(e.target.value)} />
      </Box>

      <TextField label='טלפון' fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />

      <Divider>כמה סועדים ?</Divider>
      <Select fullWidth value={selectedDinners} onChange={(e) => setSelectedDinners(e.target.value)}>
        {dinners.current.map((d) => (
          <MenuItem key={d} value={d}>
            {d}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ position: 'absolute', bottom: 0, padding: 2, width: '100%' }}>
        <Button onClick={onSubmit} variant='contained' fullWidth disabled={loading}>
          הרשמה
        </Button>
      </Box>
    </Box>
  );
};

export default ApplicationForm;
