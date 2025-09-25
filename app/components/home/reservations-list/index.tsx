import { Reservation } from '@/app/models/reservation';
import { Box, ListItemButton, TextField, Typography } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

interface Props {
  reservations: Reservation[];
}

const ReservationsList = (props: Props) => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant='h5'>הזמנות</Typography>

      <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 0.5 }}>
          <TextField placeholder='חיפוש לפי שם/טלפון' slotProps={{ input: { startAdornment: <SearchIcon sx={{ marginInlineStart: 2 }} /> } }} fullWidth />
        </Box>
        <Box sx={{ flex: 0.1 }}>
          <ListItemButton sx={{ color: 'text.secondary', padding: 2, justifyContent: 'center' }}>
            סינון&nbsp;
            <FilterListIcon />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ReservationsList;
