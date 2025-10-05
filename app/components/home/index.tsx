'use client';

import { Reservation, ReservationAction } from '@/app/models/reservation';
import { useManagementStore } from '@/app/store/management-provider';
import { useEffect, useState } from 'react';
import ReservationsList from './reservations-list';
import ReservationsFilter from './reservations-filter';
import { Box, Typography } from '@mui/material';
import ApproveOrDeclineReservation from './approve-decline-reservation';
import { ReservationsCacheUtils } from '@/app/utils/reservations-cache';
import ReservationsRefresh from './reservations-refresh';

const Home = () => {
  const storeReservations = useManagementStore((s) => s.reservations);
  const isFetched = useManagementStore((s) => s.isReservationsFetched);

  const [reservations, setReservations] = useState<Reservation[]>(storeReservations);

  const [selectedReservation, setSelectedReservation] = useState<ReservationAction | null>(null);

  useEffect(() => {
    refreshReservations(storeReservations);
  }, [storeReservations]);

  const refreshReservations = (state: Reservation[]) => {
    setReservations(state.filter((r) => !ReservationsCacheUtils.hiddenReservations.has(r.id)).sort((a, b) => a.ts - b.ts));
  };

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h5'>הזמנות</Typography>
      <ReservationsFilter />
      <ReservationsList reservations={reservations} setReservationAction={setSelectedReservation} />
      <ApproveOrDeclineReservation reservation={selectedReservation} onCancel={() => setSelectedReservation(null)} />
      <ReservationsRefresh reservations={reservations} setReservations={setReservations} />
    </Box>
  );
};

export default Home;
