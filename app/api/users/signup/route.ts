import { ApiResponse } from '@/app/models/api-response';
import errorHandler from '@/app/utils/error-handler';
import { UsersUtils } from '@/app/utils/users';
import database from '../../database';
import { hash } from 'bcrypt';
import { JwtUtils } from '@/app/utils/jwt';
import { NextResponse } from 'next/server';
import { CookieUtils } from '@/app/utils/cookies';

export const POST = async (request: Request) =>
  errorHandler<boolean>(async () => {
    const body: { email: string; password: string; name: string; phone: string } = await request.json();

    body.email = body.email?.trim().toLocaleLowerCase();

    const { email, password, name, phone } = body;

    if (!email || !password || !name || !phone) {
      throw ApiResponse.InvalidBody();
    }

    const userId = UsersUtils.convertEmailToUserId(email);
    const user = await UsersUtils.getUserByUid(userId);

    if (user) {
      throw ApiResponse.UserAlradyExist();
    }

    const hashPassword = await hash(password, 12);
    await UsersUtils.createUser({
      email,
      name,
      phone,
      password: hashPassword,
      role: 'user',
      userId,
    });

    await database.auth.createUser({ email, password, uid: userId });
    await database.auth.setCustomUserClaims(userId, { uid: userId, role: 'user' });

    const token = await JwtUtils.getToken({ role: 'user', userId });

    if (!token) {
      throw ApiResponse.FailedToFetchUser();
    }

    const response = NextResponse.json(ApiResponse.success(true));

    CookieUtils.setAuthCookie(response, token);

    return response;
  });
