'use client';

import { Reservation, ReservationAction } from '@/app/models/reservation';
import { useManagementStore } from '@/app/store/management-provider';
import { useEffect, useState } from 'react';
import ReservationsList from './reservations-list';
import ReservationsFilter from './reservations-filter';
import { Box, CircularProgress, Typography } from '@mui/material';
import ApproveOrDeclineReservation from './approve-decline-reservation';
import { ReservationsCacheUtils } from '@/app/utils/reservations-cache';
import ReservationsRefresh from './reservations-refresh';

const Home = () => {
  const storeReservations = useManagementStore((s) => s.reservations);
  const isFetched = useManagementStore((s) => s.isReservationsFetched);

  const [reservations, setReservations] = useState<Reservation[]>(storeReservations);
  const [selectedReservation, setSelectedReservation] = useState<ReservationAction | null>(null);

  const [dinners, setDinners] = useState<Set<number>>(new Set());
  const [phone, setPhone] = useState('');

  useEffect(() => {
    refreshReservations(storeReservations, phone, dinners);
  }, [storeReservations, phone, dinners]);

  const refreshReservations = (state: Reservation[], phone: string, dinners: Set<number>) => {
    setReservations(
      state.filter((r) => !ReservationsCacheUtils.hiddenReservations.has(r.id) && (!phone || r.phone.includes(phone)) && (!dinners.size || dinners.has(r.dinners))).sort((a, b) => a.ts - b.ts)
    );
  };

  if (!isFetched) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100svh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <ReservationsFilter selectedDinners={dinners} setSelectedDinners={setDinners} phone={phone} setPhone={setPhone} />
      <ReservationsList reservations={reservations} setReservationAction={setSelectedReservation} />
      <ApproveOrDeclineReservation reservation={selectedReservation} onCancel={() => setSelectedReservation(null)} />
      <ReservationsRefresh reservations={reservations} setReservations={setReservations} />
    </Box>
  );
};

export default Home;
