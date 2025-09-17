'use client';

import { Line } from '@/app/models/branch';
import { CustomerReservation } from '@/app/models/reservation';
import { useEffect, useState } from 'react';
import TrackStatus from './track-status';
import { onValue, ref } from 'firebase/database';
import { REALTIME_DATABASE } from '@/app/utils/firebase-client';

interface Props {
  reservation: CustomerReservation;
  lines: Line[];
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
    return <div>Approved</div>;
  }

  if (reservation.status === 'cancel') {
    return <div>Cancel</div>;
  }

  return <TrackStatus lines={props.lines} reservation={reservation} />;
};

export default Track;
