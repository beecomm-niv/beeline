'use client';

import { SnackbarProvider } from 'notistack';

interface Props {
  children: React.ReactNode;
}

const Snackbar = (props: Props) => (
  <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000}>
    {props.children}
  </SnackbarProvider>
);

export default Snackbar;
