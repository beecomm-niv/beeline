import { ApiResponse } from '@/app/models/api-response';
import { ReservationApplication } from '@/app/models/reservation';
import { CustomerUtils } from '@/app/utils/customers';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { OtpUtils } from '@/app/utils/otp';
import { NextResponse } from 'next/server';

export const POST = (request: Request) =>
  errorHandler<string>(async () => {
    const accessToken = request.headers.get('access_token');
    if (!accessToken) {
      throw ApiResponse.UnknownError();
    }

    const payload = await JwtUtils.verifyToken<{ branchId: string }>(accessToken);
    if (!payload) {
      throw ApiResponse.UnknownError();
    }

    const body: ReservationApplication = await request.json();
    body.branchId = payload.branchId;

    const { branchId, dinners, fullName, phone } = body;

    if (!branchId || !dinners || !fullName || !phone) {
      throw ApiResponse.InvalidBody();
    }

    const customer = await CustomerUtils.getCustomerByPhone(phone);
    if (customer?.activeReservationId) {
      throw ApiResponse.CustomerHaveActiveReservation();
    }

    await OtpUtils.trySendOTP(phone);

    const token = await JwtUtils.getToken(body, '5m');

    if (!token) {
      throw ApiResponse.UnknownError();
    }

    return NextResponse.json(ApiResponse.success(token));
  });
