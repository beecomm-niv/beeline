import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '../models/locales';
import { Route } from '../models/route';
import { cookies } from 'next/headers';
import { JwtUtils } from '../utils/jwt';

const locales: Locale[] = ['he', 'en'];
const defaultLocale: Locale = 'he';

const routes: Route[] = [
  {
    pathname: '/login',
    useAuthGuard: false,
    redirect: true,
    default: true,
  },

  {
    pathname: '/management',
    useAuthGuard: true,
    default: true,
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

  if (handler.useAuthGuard) {
    return await authGuardHandler(request);
  }

  return NextResponse.next();
};

const authGuardHandler = async (request: Request) => {
  const c = await cookies();
  const token = c.get('sessionId')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const jwtBody = await JwtUtils.verifyToken(token);
  if (!jwtBody) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.next();
  response.headers.append('x-authenticated-user', jwtBody.userId);

  return response;
};

export default pagesMiddleware;
