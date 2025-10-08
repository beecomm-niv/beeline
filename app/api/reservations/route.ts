import { ApiResponse } from '@/app/models/api-response';
import { CustomerReservationStatus, Reservation } from '@/app/models/reservation';
import errorHandler from '@/app/utils/error-handler';
import { ReservationUtils } from '@/app/utils/reservations';
import { SmsUtils } from '@/app/utils/sms';
import { NextRequest, NextResponse } from 'next/server';

interface Body {
  reservation: Reservation;
  status: CustomerReservationStatus;
}

export const POST = (request: NextRequest) =>
  errorHandler<boolean>(async () => {
    const { reservation, status }: Body = await request.json();

    if (!reservation.id || !reservation.branchId || !status) {
      throw ApiResponse.InvalidBody();
    }

    await ReservationUtils.finishReservation(reservation.id, reservation.branchId, status);

    if (status === 'approved') {
      await SmsUtils.sendMessage(reservation.branchId, reservation.phone, `התור שלכם הגיע ! יש לפנות למארחת המסעדה להושבה..`);
    }

    return NextResponse.json(ApiResponse.success(true));
  });
