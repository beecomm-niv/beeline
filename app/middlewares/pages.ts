import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '../models/locales';
import { Route } from '../models/route';
import { cookies } from 'next/headers';
import { JwtUtils } from '../utils/jwt';
import { JwtBody } from '../models/jwt-body';

const locales: Locale[] = ['he', 'en'];
const defaultLocale: Locale = 'he';

const routes: Route[] = [
  {
    pathname: '/login',
    useAuthGuard: false,
    redirect: true,
  },

  {
    pathname: '/management',
    useAuthGuard: true,
  },
];

const pagesMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const locale = locales.find((locale) => pathname.startsWith(`/${locale}`));

  if (locale) {
    const path = pathname.replace(`/${locale}`, '');
    return pageHandler(request, path);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
};

const pageHandler = async (request: Request, path: string) => {
  const handler = routes.find((r) => r.pathname === path);
  if (!handler) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const needProccess = handler.useAuthGuard || handler.redirect;
  if (!needProccess) return NextResponse.next();

  const c = await cookies();
  const token = c.get('sessionId')?.value;

  let body: JwtBody | null = null;
  if (token) {
    body = await JwtUtils.verifyToken(token);
  }

  if (handler.useAuthGuard) {
    return await authGuardHandler(request, body);
  }

  if (body) {
    return NextResponse.redirect(new URL('/management', request.url));
  }

  return NextResponse.next();
};

const authGuardHandler = async (request: Request, body: JwtBody | null) => {
  if (!body) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();
  response.headers.append('x-authenticated-user', body.userId);

  return response;
};

export default pagesMiddleware;
