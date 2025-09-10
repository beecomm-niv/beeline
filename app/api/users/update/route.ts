import { ApiResponse } from '@/app/models/api-response';
import { User } from '@/app/models/user';
import errorHandler from '@/app/utils/error-handler';
import { UsersUtils } from '@/app/utils/users';
import { NextResponse } from 'next/server';

export const POST = (request: Request) =>
  errorHandler<boolean>(async () => {
    const user: User = await request.json();

    if (!user.userId) {
      throw ApiResponse.InvalidBody();
    }

    await UsersUtils.updateUser(user);

    return NextResponse.json(ApiResponse.success(true));
  });
