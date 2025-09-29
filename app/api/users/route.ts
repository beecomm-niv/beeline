import { ApiResponse } from '@/app/models/api-response';
import { JwtBody } from '@/app/models/jwt-body';
import { UserDTO } from '@/app/models/user';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { UsersUtils } from '@/app/utils/users';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () =>
  errorHandler<UserDTO>(async () => {
    const c = await cookies();
    const token = c.get('sessionId')?.value || '';

    if (!token) {
      throw ApiResponse.Unauthorized();
    }

    const jwtBody = await JwtUtils.verifyToken<JwtBody>(token);

    if (!jwtBody) {
      throw ApiResponse.FailedToFetchUser();
    }

    const user = await UsersUtils.getUserDtoById(jwtBody.userId);

    if (!user) {
      throw ApiResponse.FailedToFetchUser();
    }

    return NextResponse.json(ApiResponse.success(user));
  });
