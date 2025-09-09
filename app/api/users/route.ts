import { ApiResponse } from '@/app/models/api-response';
import { UserDTO } from '@/app/models/user';
import errorHandler from '@/app/utils/error-handler';
import { JwtUtils } from '@/app/utils/jwt';
import { UsersUtils } from '@/app/utils/users';

export const POST = async (request: Request) =>
  errorHandler<UserDTO>(async () => {
    const { token }: { token: string } = await request.json();

    const jwtBody = JwtUtils.verifyToken(token);

    if (!jwtBody) {
      throw ApiResponse.FailedToFetchUser();
    }

    const user = await UsersUtils.getUserByUid(jwtBody.userId);

    if (!user) {
      throw ApiResponse.FailedToFetchUser();
    }

    user.password = undefined!;

    return ApiResponse.success(user);
  });
