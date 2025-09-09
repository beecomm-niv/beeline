import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '../models/locales';

const locales: Locale[] = ['he', 'en'];
const defaultLocale: Locale = 'he';

const pagesMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
    return pageHandler(request);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
};

const pageHandler = (request: Request) => {
  return NextResponse.next();
};

export default pagesMiddleware;
