'use client';

import { Reservation } from '@/app/models/reservation';
import { useManagementStore } from '@/app/store/management-provider';
import { useEffect, useState } from 'react';
import ReservationsList from './reservations-list';

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

  return <ReservationsList reservations={reservations} />;
};

export default Home;
