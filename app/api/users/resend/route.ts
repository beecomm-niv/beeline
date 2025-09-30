import { ApiResponse } from '@/app/models/api-response';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { OtpUtils } from '@/app/utils/otp';
import { UsersUtils } from '@/app/utils/users';
import { NextRequest, NextResponse } from 'next/server';

export const POST = (request: NextRequest) =>
  errorHandler<boolean>(async () => {
    const token = request.headers.get('access_token');
    if (!token) {
      throw ApiResponse.Unauthorized();
    }

    const payload = await JwtUtils.verifyToken<{ userId: string }>(token);
    if (!payload) {
      throw ApiResponse.Unauthorized();
    }

    const user = await UsersUtils.getUserByUid(payload.userId);
    if (!user) {
      throw ApiResponse.Unauthorized();
    }

    await OtpUtils.trySendOTP(user.userId, user.phone);

    return NextResponse.json(ApiResponse.success(true));
  });
