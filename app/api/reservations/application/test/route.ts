import { ApiResponse } from '@/app/models/api-response';
import { ReservationApplication } from '@/app/models/reservation';
import { CustomerUtils } from '@/app/utils/customers';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { OtpUtils } from '@/app/utils/otp';
import { ReservationUtils } from '@/app/utils/reservations';
import { NextResponse } from 'next/server';

export const POST = (request: Request) =>
  errorHandler<string>(async () => {
    const accessToken = request.headers.get('access_token');
    if (!accessToken) {
      throw ApiResponse.Unauthorized();
    }

    const body = await JwtUtils.verifyToken<ReservationApplication>(accessToken);
    if (!body) {
      throw ApiResponse.TokenIsExpired();
    }

    const { code }: { code: string } = await request.json();

    const customer = await CustomerUtils.getCustomerByPhone(body.phone);
    if (customer?.activeReservationId) {
      throw ApiResponse.UnknownError();
    }

    await OtpUtils.tryMatchOTP(body.phone, code);

    const reservation = await ReservationUtils.signReservation(body);

    await CustomerUtils.updateCustomer({ phone: body.phone, activeReservationId: reservation.id });

    return NextResponse.json(ApiResponse.success(reservation.id));
  });
