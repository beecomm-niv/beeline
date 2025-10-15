import type { NextRequest } from 'next/server';
import apiMiddleware from './app/middlewares/api';
import pagesMiddleware from './app/middlewares/pages';
import { qrMiddleware } from './app/middlewares/qr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/qr')) {
    return qrMiddleware(request);
  }

  if (pathname.startsWith('/api')) {
    const route = pathname.replace('/api/', '/');
    return await apiMiddleware(request, route);
  }

  return await pagesMiddleware(request);
}

// 🔑 קובע איפה המידלוואר יופעל
export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
