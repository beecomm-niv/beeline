import { ApiResponse } from '@/app/models/api-response';
import { CookieUtils } from '@/app/utils/cookies';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { UsersUtils } from '@/app/utils/users';

import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export const POST = (request: Request) =>
  errorHandler<boolean>(async () => {
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

    const token = await JwtUtils.getToken({ role: user.role, userId: user.userId });

    if (!token) {
      throw ApiResponse.FailedToFetchUser();
    }

    const response = NextResponse.json(ApiResponse.success(true));

    CookieUtils.setAuthCookie(response, token);

    return response;
  });
