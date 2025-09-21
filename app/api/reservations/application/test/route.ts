import { ApiResponse } from '@/app/models/api-response';
import { ReservationApplication } from '@/app/models/reservation';
import { CustomerUtils } from '@/app/utils/customers';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { ReservationUtils } from '@/app/utils/reservations';
import { NextResponse } from 'next/server';

const TRIES_TRESHOLD = 5;

export const POST = (request: Request) =>
  errorHandler<string>(async () => {
    let result = '';

    const accessToken = request.headers.get('access_token');
    if (!accessToken) {
      throw ApiResponse.UnknownError();
    }

    const body = await JwtUtils.verifyToken<ReservationApplication>(accessToken);
    if (!body) {
      throw ApiResponse.InvalidBody();
    }

    const { code }: { code: string } = await request.json();

    if (!code) {
      throw ApiResponse.InvalidBody();
    }

    const customer = await CustomerUtils.getCustomerByPhone(body.phone);
    if (!customer || customer.activeReservationId) {
      throw ApiResponse.UnknownError();
    }

    if (customer.otp.tries >= TRIES_TRESHOLD) {
      throw ApiResponse.TooManyTries();
    }

    const success = customer.otp.code === code;

    if (success) {
      const reservation = await ReservationUtils.signReservation(body);

      customer.activeReservationId = reservation.id;
      customer.otp = null!;

      result = reservation.id;
    } else {
      customer.otp.tries++;
    }

    await CustomerUtils.updateCustomer(customer);
    if (!success) {
      throw ApiResponse.UnmatchedCode();
    }

    return NextResponse.json(ApiResponse.success(result));
  });
