import Track from '@/app/components/track';
import { BranchUtils } from '@/app/utils/branch';
import { ReservationUtils } from '@/app/utils/reservations';

interface Props {
  params: Promise<{ id: string }>;
}

const TrackPage = async (props: Props) => {
  const reservationId = (await props.params).id;

  if (!reservationId) {
    return <div>Error</div>;
  }

  const reservation = await ReservationUtils.getReservation(reservationId);
  if (!reservation) {
    return <div>Error</div>;
  }

  const branch = await BranchUtils.getBranchById(reservation.branchId);
  if (!branch?.lines) {
    return <div>Error</div>;
  }

  return <Track lines={branch.lines} reservation={reservation} />;
};

export default TrackPage;
