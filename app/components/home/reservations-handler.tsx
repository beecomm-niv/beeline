'use client';

import { Reservation } from '@/app/models/reservation';
import { useManagementStore } from '@/app/store/management-provider';
import { REALTIME_DATABASE } from '@/app/utils/firebase-client';
import { ReservationsCacheUtils } from '@/app/utils/reservations-cache';
import { onValue, ref } from 'firebase/database';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  branchId: string;
}

const ReservationsHandler = (props: Props) => {
  const setReservations = useManagementStore((s) => s.setReservations);

  useEffect(() => {
    const sub = onValue(ref(REALTIME_DATABASE, `/b_line/${props.branchId}`), (snapshot) => {
      const data = snapshot.val();
      const reservations = Object.values(data || {}) as Reservation[];

      ReservationsCacheUtils.clean(reservations);
      setReservations(reservations);
    });

    return sub;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.children;
};

export default ReservationsHandler;
