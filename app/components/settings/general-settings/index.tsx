'use client';

import useBranchAction from '@/app/hooks/useBranchUpdate';
import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { HttpUtils } from '@/app/utils/http';
import { Branch } from '@/app/models/branch';

const GeneralSettings = () => {
  const { branch, loading, saveBranch } = useBranchAction();

  const [editBranch, setEditBranch] = useState<Branch>(branch);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preshow, setPreshow] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setEditBranch(branch);
  }, [branch]);

  const onFileSelected = (files: FileList | null) => {
    if (!files || files.length > 1) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]); // קורא את הקובץ כ־base64
    reader.onload = () => {
      setSelectedFile(files[0]);
      setPreshow(reader.result as string); // שמירת ה־base64 ב־state
    };
  };

  const onChange = (key: keyof Branch, val: any) => {
    setEditBranch((b) => ({ ...b, [key]: val }));
  };

  const getImageUrl = async () => {
    if (!selectedFile) {
      return branch.image;
    }

    const formData = new FormData();
    formData.append('images', selectedFile);

    const response = await HttpUtils.post<string>('/branches/image', formData, { params: { branchId: branch.id } });
    if (response.hasError) {
      throw new Error(response.errorMessage);
    }

    return response.value;
  };

  const onSave = async () => {
    const body: Branch = { ...editBranch };

    body.image = await getImageUrl();

    saveBranch(body);
  };

  return (
    <Box>
      <Typography variant='h5'>הגדרות כלליות</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>שם מסעדה</Typography>
          <TextField value={editBranch.name} onChange={(e) => onChange('name', e.target.value)} />
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>תמונה</Typography>
          {!editBranch.image && !preshow && (
            <Card sx={{ width: 100, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }} onClick={() => inputRef.current?.click()}>
              <Typography color='primary'>בחר תמונה</Typography>
            </Card>
          )}

          {(preshow || editBranch.image) && (
            <Image src={preshow || editBranch.image || ''} alt='' width='100' height='100' style={{ borderRadius: '20px' }} onClick={() => inputRef.current?.click()} />
          )}

          <input ref={inputRef} style={{ width: 0, height: 0, opacity: 0, position: 'absolute', top: 0, left: 0 }} type='file' onChange={(e) => onFileSelected(e.target.files)} />
        </Box>

        <Divider />

        <Button sx={{ marginTop: 4 }} variant='contained' onClick={onSave} disabled={loading}>
          שמירה
        </Button>
      </Box>
    </Box>
  );
};

export default GeneralSettings;
