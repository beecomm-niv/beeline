export interface OTP {
  code: string;
  ts: number;
  tries: number;
  count: number;
}
