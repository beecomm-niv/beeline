export interface Customer {
  phone: string;
  activeReservationId: string;
  otp: OTP;
}

export interface OTP {
  code: string;
  ts: number;
  tries: number;
  count: number;
}
