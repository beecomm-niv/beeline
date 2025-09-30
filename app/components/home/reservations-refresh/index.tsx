import { Reservation } from '@/app/models/reservation';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  reservations: Reservation[];
  setReservations: Dispatch<SetStateAction<Reservation[]>>;
}

const ReservationsRefresh = (props: Props) => {
  useEffect(() => {
    const t = setTimeout(() => {
      props.setReservations((r) => [...r]);
    }, 30_000);

    return () => clearTimeout(t);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reservations]);

  return null;
};

export default ReservationsRefresh;
