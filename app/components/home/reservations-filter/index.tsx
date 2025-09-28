import { Box, ListItemButton, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const ReservationsFilter = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ flex: 0.5 }}>
        <TextField placeholder='חיפוש לפי שם/טלפון' slotProps={{ input: { startAdornment: <SearchIcon sx={{ marginInlineStart: 2, color: 'text.secondary' }} /> } }} fullWidth />
      </Box>
      <Box sx={{ flex: 0.1 }}>
        <ListItemButton sx={{ color: 'text.secondary', padding: 2, justifyContent: 'center' }}>
          סינון&nbsp;
          <FilterListIcon />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default ReservationsFilter;
