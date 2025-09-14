import { ApiResponse } from '@/app/models/api-response';
import errorHandler from '@/app/utils/error-handler';
import { UsersUtils } from '@/app/utils/users';
import { hash } from 'bcrypt';
import { JwtUtils } from '@/app/utils/jwt';
import { NextResponse } from 'next/server';
import { CookieUtils } from '@/app/utils/cookies';
import { adminAuth } from '../../database';

export const POST = async (request: Request) =>
  errorHandler<boolean>(async () => {
    const body: { email: string; password: string; name: string; phone: string } = await request.json();

    body.email = body.email?.trim().toLocaleLowerCase();

    const { email, password, name, phone } = body;

    if (!email || !password || !name || !phone) {
      throw ApiResponse.InvalidBody();
    }

    const isEmailExist = await UsersUtils.isEmailExist(email);

    if (isEmailExist) {
      throw ApiResponse.UserAlradyExist();
    }

    const hashPassword = await hash(password, 12);
    const user = await UsersUtils.createUser(email, hashPassword, name, phone);

    await adminAuth.createUser({ email, password, uid: user.userId });
    await adminAuth.setCustomUserClaims(user.userId, { uid: user.userId, domain: 'beeline' });

    const token = await JwtUtils.getToken({ role: 'user', userId: user.userId });

    if (!token) {
      throw ApiResponse.FailedToFetchUser();
    }

    const response = NextResponse.json(ApiResponse.success(true));

    CookieUtils.setAuthCookie(response, token);

    return response;
  });
