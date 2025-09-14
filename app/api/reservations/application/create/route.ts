import { ApiResponse } from '@/app/models/api-response';
import { ReservationApplication } from '@/app/models/reservation';
import { CustomerUtils } from '@/app/utils/customers';
import { moment } from '@/app/utils/dayjs';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { NextResponse } from 'next/server';

const COUNT_TRESHOLD = 5;

export const POST = (request: Request) =>
  errorHandler<string>(async () => {
    const body: ReservationApplication = await request.json();

    const { branchId, dinners, fullName, phone } = body;

    if (!branchId || !dinners || !fullName || !phone) {
      throw ApiResponse.InvalidBody();
    }

    const customer = await CustomerUtils.getCustomerByPhone(phone);
    if (customer.hasActiveReservation) {
      throw ApiResponse.CustomerHaveActiveReservation();
    }

    const isOtpActive = moment(customer.otp.ts).diff(moment(), 'hours') < 5;

    if (isOtpActive) {
      if (customer.otp.count >= COUNT_TRESHOLD) {
        throw ApiResponse.TooManyTries();
      }

      customer.otp.code = CustomerUtils.getNewCode();
    } else {
      customer.otp = CustomerUtils.createOtp();
    }

    customer.otp.count++;

    await CustomerUtils.updateCustomer(customer);
    const token = await JwtUtils.getToken(body);

    if (!token) {
      throw ApiResponse.UnknownError();
    }

    return NextResponse.json(ApiResponse.success(token));
  });
