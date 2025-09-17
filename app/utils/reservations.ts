import { v4 } from 'uuid';
import { adminRealtimeDatabase } from '../api/database';
import { CustomerReservation, LightReservation, Reservation, ReservationApplication } from '../models/reservation';
import { moment } from './dayjs';

export class ReservationUtils {
  private static reservationRef = adminRealtimeDatabase.ref('reservations');
  private static customerReservationsRef = adminRealtimeDatabase.ref('c_line');

  public static signReservation = async (application: ReservationApplication) => {
    const reservation = this.createReservationFromApplication(application);

    const id = reservation.id;
    const updates: Record<string, any> = {};

    updates[`/reservations/${id}`] = { id, status: 'pending', branchId: reservation.branchId } as CustomerReservation;
    updates[`/b_line/${reservation.branchId}/${id}`] = reservation;
    updates[`/c_line/${reservation.branchId}/${id}`] = { dinners: reservation.dinners, id, ts: reservation.ts } as LightReservation;

    await adminRealtimeDatabase.ref().update(updates);

    return reservation;
  };

  private static createReservationFromApplication = (application: ReservationApplication): Reservation => ({
    branchId: application.branchId,
    dinners: application.dinners,
    fullName: application.fullName,
    id: v4().replaceAll(/-/g, ''),
    phone: application.phone,
    ts: moment().valueOf(),
  });

  public static getReservation = async (id: string): Promise<CustomerReservation | null> => {
    const data = await this.reservationRef.child('/' + id).get();

    return data.val() as CustomerReservation | null;
  };

  public static getCustomerReservationLine = async (branchId: string): Promise<Record<string, LightReservation> | null> => {
    const data = await this.customerReservationsRef.child('/' + branchId).get();

    return data.val() as Record<string, LightReservation> | null;
  };
}
