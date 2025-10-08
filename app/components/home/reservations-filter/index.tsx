import { Box, Chip, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useManagementStore } from '@/app/store/management-provider';
import { useMemo, useState } from 'react';

interface Props {
  selectedDinners: Set<number>;
  setSelectedDinners: (dinners: Set<number>) => void;

  phone: string;
  setPhone(phone: string): void;
}

const ReservationsFilter = (props: Props) => {
  const [selectedDinners, setSelectedDinners] = useState<number>(0);

  const branch = useManagementStore((s) => s.branch);
  const dinners = useMemo(
    () => branch.lines?.reduce<{ lineId: string; dinners: number }[]>((prev, line) => prev.concat(line.dinnersRange.map((d) => ({ lineId: line.id, dinners: d }))), []),
    [branch.lines]
  );

  const onDinnersChange = (value: { lineId: string; dinners: number }) => {
    const line = branch.lines?.find((l) => l.id === value.lineId);

    setSelectedDinners(value.dinners);
    props.setSelectedDinners(new Set(line?.dinnersRange || []));
  };

  return (
    <Box>
      <Box sx={{ width: '50%' }}>
        <TextField
          value={props.phone}
          onChange={(e) => props.setPhone(e.target.value)}
          placeholder='חיפוש לפי שם/טלפון'
          slotProps={{ input: { startAdornment: <SearchIcon sx={{ marginInlineStart: 2, color: 'text.secondary' }} /> } }}
          fullWidth
        />
      </Box>

      <Box sx={{ marginTop: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip label='הכל' variant={!selectedDinners ? 'filled' : 'outlined'} clickable onClick={() => onDinnersChange({ dinners: 0, lineId: '' })} />
        {dinners?.map((d) => (
          <Chip key={d.dinners} label={`${d.dinners} סועדים`} variant={selectedDinners === d.dinners ? 'filled' : 'outlined'} clickable onClick={() => onDinnersChange(d)} />
        ))}
      </Box>
    </Box>
  );
};

export default ReservationsFilter;
