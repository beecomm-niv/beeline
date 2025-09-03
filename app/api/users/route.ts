import { ApiResponse } from '@/app/models/api-response';
import errorHandler from '@/app/utils/error-handler';
import databse from '../database';

const ref = databse.getReference('users');

export const POST = (request: Request) =>
  errorHandler<any>(async () => {
    const data = await ref.child('/123').get();
    const user = data.val();

    if (user) {
      return ApiResponse.success(user);
    }

    return ApiResponse.BadUserOrPassword();
  });
