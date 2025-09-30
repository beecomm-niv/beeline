import { ApiResponse } from '@/app/models/api-response';
import { CookieUtils } from '@/app/utils/cookies';
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

    const { code } = await request.json();

    await OtpUtils.tryMatchOTP(user.userId, user.phone, code);

    const result = await JwtUtils.getToken({ role: user.role, userId: user.userId });
    if (!result) {
      throw ApiResponse.UnknownError();
    }

    const response = NextResponse.json(ApiResponse.success(true));
    CookieUtils.setAuthCookie(response, result);

    return response;
  });
