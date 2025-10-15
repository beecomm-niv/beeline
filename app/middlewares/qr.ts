import { NextRequest, NextResponse } from 'next/server';
import { JwtUtils } from '../utils/jwt';

export const qrMiddleware = async (request: NextRequest) => {
  try {
    const params = new URL(request.url).searchParams;
    const branchId = params.get('q');

    if (!branchId) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const accessToken = await JwtUtils.getToken({ branchId }, '5m');

    return NextResponse.redirect(new URL(`/reservation/${accessToken}`, request.url));
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
