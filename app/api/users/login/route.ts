import { ApiResponse } from '@/app/models/api-response';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { OtpUtils } from '@/app/utils/otp';
import { UsersUtils } from '@/app/utils/users';

import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export const POST = (request: Request) =>
  errorHandler<string>(async () => {
    const body: { email: string; password: string } = await request.json();

    body.email = body.email?.trim().toLocaleLowerCase();

    const { email, password } = body;

    if (!email || !password) {
      throw ApiResponse.BadUserOrPassword();
    }

    const user = await UsersUtils.getUserByEmail(email);

    if (!user) {
      throw ApiResponse.BadUserOrPassword();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiResponse.BadUserOrPassword();
    }

    await OtpUtils.trySendOTP(user.userId, user.phone, user.branchId);

    const token = await JwtUtils.getToken({ userId: user.userId });

    if (!token) {
      throw ApiResponse.FailedToFetchUser();
    }

    return NextResponse.json(ApiResponse.success(token));
  });
