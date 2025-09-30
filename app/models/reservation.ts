export interface Reservation extends ReservationApplication {
  id: string;
  ts: number;
}

export interface ReservationApplication {
  phone: string;
  fullName: string;
  dinners: number;
  branchId: string;
}

export interface LightReservation {
  id: string;
  ts: number;
  dinners: number;

  lineId?: string;
}

export type CustomerReservationStatus = 'pending' | 'cancel' | 'approved';
export interface CustomerReservation {
  id: string;
  branchId: string;
  status: CustomerReservationStatus;
}

export interface ReservationAction {
  reservation: Reservation;
  status: CustomerReservationStatus;
}
