import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const MiddlewareMap: { path: string[]; handler: (request: NextRequest) => Promise<NextResponse> }[] = [];

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
