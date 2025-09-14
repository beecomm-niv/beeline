export interface Customer {
  phone: string;
  hasActiveReservation: boolean;
  otp: OTP;
}

export interface OTP {
  code: string;
  ts: number;
  tries: number;
  count: number;
}
