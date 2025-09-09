import type { NextRequest } from 'next/server';
import apiMiddleware from './app/middlewares/api';
import pagesMiddleware from './app/middlewares/pages';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    const route = pathname.replace('/api/', '/');
    return apiMiddleware(request, route);
  }

  return pagesMiddleware(request);
}

// 🔑 קובע איפה המידלוואר יופעל
export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
