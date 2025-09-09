import { ApiResponse } from '@/app/models/api-response';
import { CookieUtils } from '@/app/utils/cookies';
import errorHandler from '@/app/utils/error-handler';
import { NextResponse } from 'next/server';

export const GET = () =>
  errorHandler<boolean>(async () => {
    const response = NextResponse.json(ApiResponse.success(true));

    CookieUtils.setAuthCookie(response, '');

    return response;
  });
