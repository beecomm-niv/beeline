'use client';

import { Reservation } from '@/app/models/reservation';
import { useManagementStore } from '@/app/store/management-provider';
import { useEffect, useState } from 'react';
import ReservationsList from './reservations-list';
import ReservationsFilter from './reservations-filter';
import { Box, Typography } from '@mui/material';

const Home = () => {
  const storeReservations = useManagementStore((s) => s.reservations);
  const isFetched = useManagementStore((s) => s.isReservationsFetched);

  const [reservations, setReservations] = useState<Reservation[]>(storeReservations);

  useEffect(() => {
    setReservations(storeReservations);
  }, [storeReservations]);

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h5'>הזמנות</Typography>
      <ReservationsFilter />
      <ReservationsList reservations={reservations} />
    </Box>
  );
};

export default Home;
