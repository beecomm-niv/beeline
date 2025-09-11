import { ApiResponse } from '@/app/models/api-response';
import { Branch } from '@/app/models/branch';
import { BranchUtils } from '@/app/utils/branch';
import errorHandler from '@/app/utils/error-handler';
import { UsersUtils } from '@/app/utils/users';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) =>
  errorHandler<boolean>(async () => {
    const userId = request.headers.get('x-authenticated-user');

    if (!userId) {
      throw ApiResponse.Unauthorized();
    }

    const body: Partial<Branch> = await request.json();

    if (!body.id) {
      throw ApiResponse.InvalidBody();
    }

    const user = await UsersUtils.getUserByUid(userId);

    if (!user || user.branchId !== body.id) {
      throw ApiResponse.Unauthorized();
    }

    await BranchUtils.updateBranch(body);

    return NextResponse.json(ApiResponse.success(true));
  });
