'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import LineManager from './line-manager';
import { useManagementStore } from '@/app/store/management-provider';
import { Branch } from '@/app/models/branch';
import { HttpUtils } from '@/app/utils/http';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

  const branch = useManagementStore((s) => s.branch);
  const setBranch = useManagementStore((s) => s.setBranch);

  const onSaveBranch = async (b: Branch) => {
    setLoading(true);

    const response = await HttpUtils.post('/branches/update', b);
    if (response.hasError) {
      window.alert(response.errorMessage);
    } else {
      setBranch(b);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ padding: '10px' }}>
      <Tabs
        value={selectedTab}
        sx={{
          '& .MuiTabs-list': {
            justifyContent: 'center',
          },
        }}
      >
        <Tab label='הגדרות תורים' value={1} onClick={() => setSelectedTab(1)} />
      </Tabs>

      <Box sx={{ marginTop: 5 }}>{selectedTab === 1 && <LineManager branch={branch} saveBranch={onSaveBranch} loading={loading} />}</Box>
    </Box>
  );
};

export default Settings;
