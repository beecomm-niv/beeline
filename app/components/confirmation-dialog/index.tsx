'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface Props {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
}

const ConfirmationDialog = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <DialogTitle>
        <Typography fontSize={30}>{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color='text.secondary'>{props.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onConfirm}>אישור</Button>
        <Button onClick={props.onCancel}>ביטול</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
