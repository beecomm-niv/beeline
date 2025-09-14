export interface Reservation {
  id: number;

  fullName: string;
  phone: string;
  dinners: number;
  branchId: string;

  lineId: string;
  ts: number;
}

export interface ReservationApplication {
  phone: string;
  fullName: string;
  dinners: string;
  branchId: string;
}
