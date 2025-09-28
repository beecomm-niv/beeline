'use client';

import useBranchAction from '@/app/hooks/useBranchUpdate';
import { Box, Divider, TextField, Typography } from '@mui/material';

const GeneralSettings = () => {
  const { branch, loading, saveBranch } = useBranchAction();

  return (
    <Box>
      <Typography variant='h5'>הגדרות כלליות</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography>שם מסעדה</Typography>
          <TextField value={branch.name} />
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography>תמונה</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralSettings;
