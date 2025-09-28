import { ApiResponse } from '@/app/models/api-response';
import errorHandler from '@/app/utils/error-handler';
import { ImageUtils } from '@/app/utils/image';
import { NextRequest, NextResponse } from 'next/server';

export const POST = (request: NextRequest) =>
  errorHandler<string>(async () => {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get('branchId');

    if (!branchId || typeof branchId !== 'string') {
      throw ApiResponse.InvalidBody();
    }

    const formData = await request.formData();

    const url = await ImageUtils.upload(formData, branchId);

    return NextResponse.json(ApiResponse.success(url));
  });
