export interface Reservation extends ReservationApplication {
  id: number;
  ts: number;
}

export interface ReservationApplication {
  phone: string;
  fullName: string;
  dinners: string;
  branchId: string;
}
