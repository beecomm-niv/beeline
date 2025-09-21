'use client';

import { Reservation } from '@/app/models/reservation';
import { useManagementStore } from '@/app/store/management-provider';
import { REALTIME_DATABASE } from '@/app/utils/firebase-client';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import ReservationsList from './reservations-list';

const Home = () => {
  const branch = useManagementStore((s) => s.branch);
  const [reservations, setReservations] = useState<Reservation[]>(undefined!);

  useEffect(() => {
    const sub = onValue(ref(REALTIME_DATABASE, `/b_line/${branch.id}`), (snapshot) => {
      const data = snapshot.val();

      setReservations(Object.values(data || {}));
    });

    return sub;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!reservations) {
    return <div>Loading...</div>;
  }

  return <ReservationsList reservations={reservations} />;
};

export default Home;
