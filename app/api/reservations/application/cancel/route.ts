import { ApiResponse } from '@/app/models/api-response';
import { CustomerReservation } from '@/app/models/reservation';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { ReservationUtils } from '@/app/utils/reservations';
import { NextRequest, NextResponse } from 'next/server';

export const POST = (request: NextRequest) =>
  errorHandler<boolean>(async () => {
    const token = request.headers.get('authorization');
    if (!token) {
      throw ApiResponse.Unauthorized();
    }

    const reservation = await JwtUtils.verifyToken<CustomerReservation>(token);
    if (!reservation) {
      throw ApiResponse.UnknownError();
    }

    await ReservationUtils.finishReservation(reservation.id, reservation.branchId, 'cancel');

    return NextResponse.json(ApiResponse.success(true));
  });
