import { ApiResponse } from '@/app/models/api-response';
import { Branch } from '@/app/models/branch';
import { BranchUtils } from '@/app/utils/branch';
import errorHandler from '@/app/utils/error-handler';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) =>
  errorHandler<Branch>(async () => {
    const { name }: { name: string } = await request.json();

    if (!name) {
      throw ApiResponse.InvalidBody();
    }

    const branch = await BranchUtils.createBranch(name);

    return NextResponse.json(ApiResponse.success(branch));
  });
