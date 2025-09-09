import { ApiResponse } from '@/app/models/api-response';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { UsersUtils } from '@/app/utils/users';

import bcrypt from 'bcrypt';

export const POST = (request: Request) =>
  errorHandler<string | null>(async () => {
    const body: { email: string; password: string } = await request.json();

    body.email = body.email?.trim().toLocaleLowerCase();

    const { email, password } = body;

    if (!email || !password) {
      throw ApiResponse.BadUserOrPassword();
    }

    const userId = UsersUtils.convertEmailToUserId(email);
    const user = await UsersUtils.getUserByUid(userId);

    if (!user) {
      throw ApiResponse.BadUserOrPassword();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiResponse.BadUserOrPassword();
    }

    const token = JwtUtils.getToken({ role: user.role, userId });

    if (!token) {
      throw ApiResponse.FailedToFetchUser();
    }

    return ApiResponse.success(token);
  });
