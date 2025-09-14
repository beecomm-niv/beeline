'use client';

import { Branch, Line } from '@/app/models/branch';
import { Box, Button, Chip, styled, Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

interface Props {
  branch: Branch;
  saveBranch: (b: Branch) => Promise<void>;
  loading: boolean;
}

const LineManager = (props: Props) => {
  const [lines, setLines] = useState<Line[]>(props.branch.lines || []);

  useEffect(() => {
    setLines(props.branch.lines || []);
  }, [props.branch.lines]);

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
          return window.alert('פעולה לא חוקית. יש תורים שונים שמכילים את אותם מספר סועדים');
        }

        set.add(range);
      }
    }

    props.saveBranch({ ...props.branch, lines });
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <ButtonsContainer>
        <Button variant='contained' onClick={onAddLine} disabled={props.loading}>
          הוסף תור +
        </Button>

        <Button variant='contained' color='primary' disabled={props.loading} onClick={onSave}>
          שמירה
        </Button>
      </ButtonsContainer>

      {lines.length === 0 && (
        <Typography marginTop={2} variant='h6'>
          אין תורים 😞
        </Typography>
      )}

      {lines.map((l) => (
        <LineItem key={l.id}>
          <Switch value={l.active} checked={l.active} onChange={(e) => onLineChange(l.id, 'active', e.target.checked)} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography fontSize={15}>סועדים</Typography>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
              <Chip key={d} label={d} color='primary' variant={l.dinnersRange.some((l) => l === d) ? 'filled' : 'outlined'} onClick={() => onDinnersRangeChange(l, d)} />
            ))}
          </Box>
          <Button color='error' variant='outlined' sx={{ borderRadius: 10 }} onClick={() => onDelete(l.id)}>
            מחיקה
          </Button>
        </LineItem>
      ))}
    </Box>
  );
};

const ButtonsContainer = styled('div')({
  display: 'flex',
  gap: 5,
  justifyContent: 'space-between',
});

const LineItem = styled('div')((theme) => ({
  borderBottom: '1px solid ' + theme.theme.palette.text.secondary,
  padding: '20px 0',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 30,
}));

export default LineManager;
