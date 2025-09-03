import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Locale } from './app/models/locales';

const locales: Locale[] = ['he', 'en'];
const defaultLocale: Locale = 'he';

function handleI18n(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
}

const MiddlewareMap: { path: string[]; handler: (request: NextRequest) => Promise<NextResponse> }[] = [];

export function middleware(request: NextRequest) {
  const i18nResponse = handleI18n(request);

  if (!i18nResponse.ok) {
    return i18nResponse;
  }

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
