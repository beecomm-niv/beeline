import { Reservation } from '../models/reservation';

export class ReservationsCacheUtils {
  public static hiddenReservations = new Set<string>();

  public static hide = (reservaionId: string) => this.hiddenReservations.add(reservaionId);

  public static clean = (reservations: Reservation[]) => {
    const currentState = new Set(reservations.map((r) => r.id));

    Array.from(this.hiddenReservations).forEach((r) => {
      if (!currentState.has(r)) {
        this.hiddenReservations.delete(r);
      }
    });
  };
}
