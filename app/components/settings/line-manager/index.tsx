'use client';

import useBranchAction from '@/app/hooks/useBranchUpdate';
import { Line } from '@/app/models/branch';
import { Box, Button, Card, Chip, Divider, ListItemButton, Switch, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

const LineManager = () => {
  const { branch, loading, saveBranch } = useBranchAction();
  const [lines, setLines] = useState<Line[]>(branch.lines || []);

  const snackbar = useSnackbar();

  useEffect(() => {
    setLines(branch.lines || []);
  }, [branch.lines]);

  const onAddLine = () => {
    setLines((l) => [...l, { id: v4(), active: true, dinnersRange: [] }]);
  };

  const onLineChange = (id: string, key: keyof Line, val: any) => {
    setLines((l) => l.map((line) => (line.id === id ? { ...line, [key]: val } : line)));
  };

  const onDelete = (id: string) => {
    setLines((l) => l.filter((line) => line.id !== id));
  };

  const onDinnersRangeChange = (line: Line, range: number) => {
    const set = new Set<number>(line.dinnersRange);

    if (set.has(range)) {
      set.delete(range);
    } else {
      set.add(range);
    }

    onLineChange(line.id, 'dinnersRange', Array.from(set));
  };

  const onSave = () => {
    const set = new Set<number>();

    for (const line of lines) {
      for (const range of line.dinnersRange) {
        if (set.has(range)) {
          return snackbar.enqueueSnackbar('פעולה לא חוקית. יש תורים שונים שמכילים את אותם מספר סועדים', { variant: 'error' });
        }

        set.add(range);
      }
    }

    saveBranch({ ...branch, lines });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {lines.map((l) => (
        <Card key={l.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px', borderRadius: '20px' }}>
          <Box>
            <Switch value={l.active} checked={l.active} onChange={(e) => onLineChange(l.id, 'active', e.target.checked)} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography fontSize={15}>סועדים</Typography>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
              <Chip key={d} label={d} color='primary' variant={l.dinnersRange.some((l) => l === d) ? 'filled' : 'outlined'} onClick={() => onDinnersRangeChange(l, d)} />
            ))}
          </Box>

          <Box>
            <ListItemButton onClick={() => onDelete(l.id)} selected>
              <Typography fontSize={16} color='error'>
                מחיקה
              </Typography>
            </ListItemButton>
          </Box>
        </Card>
      ))}

      <Divider />

      <Card sx={{ height: 75, borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dotted #383838' }} onClick={onAddLine}>
        <Typography color='primary' variant='h5'>
          תור חדש +
        </Typography>
      </Card>

      {lines.length > 0 && (
        <Button variant='contained' fullWidth sx={{ marginTop: 2 }} onClick={onSave} disabled={loading}>
          <Typography fontSize={20}>שמירה</Typography>
        </Button>
      )}
    </Box>
  );
};

export default LineManager;
