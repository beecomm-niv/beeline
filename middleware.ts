import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import cookcieTokenMiddleware from './app/middlewares/cookie-token.middleware';
import headerTokenMiddleware from './app/middlewares/header-token.middleware';

const MiddlewareMap: { path: string[]; handler: (request: NextRequest) => Promise<NextResponse> }[] = [
  { path: ['/'], handler: cookcieTokenMiddleware },
  { path: ['/api/users'], handler: headerTokenMiddleware },
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const handlder = MiddlewareMap.find((m) => m.path.includes(pathname))?.handler;

  if (handlder) {
    return handlder(request);
  }

  return NextResponse.next();
}

// 🔑 קובע איפה המידלוואר יופעל
export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
