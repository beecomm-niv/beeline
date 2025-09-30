'use client';

import { Line } from '@/app/models/branch';
import { CustomerReservation } from '@/app/models/reservation';
import { useEffect, useState } from 'react';
import TrackStatus from './track-status';
import { onValue, ref } from 'firebase/database';
import { REALTIME_DATABASE } from '@/app/utils/firebase-client';
import ReservationApproved from './reservation-approved';
import ReservationCancel from './reservation-cancel';

interface Props {
  reservation: CustomerReservation;
  lines: Line[];
  token: string;
}

const Track = (props: Props) => {
  const [reservation, setReservation] = useState<CustomerReservation | null>(props.reservation);

  useEffect(() => {
    const sub = onValue(ref(REALTIME_DATABASE, 'reservations/' + props.reservation.id), (snapshot) => {
      setReservation(snapshot.val());
    });

    return sub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!reservation) {
    return <div>Not found</div>;
  }

  if (reservation.status === 'approved') {
    return <ReservationApproved />;
  }

  if (reservation.status === 'cancel') {
    return <ReservationCancel />;
  }

  return <TrackStatus lines={props.lines} reservation={reservation} token={props.token} />;
};

export default Track;
