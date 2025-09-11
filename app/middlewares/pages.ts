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

  {
    pathname: '/management/settings',
    useAuthGuard: true,
  },
];

const pagesMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const locale = locales.find((locale) => pathname.startsWith(`/${locale}`));

  if (locale) {
    const path = pathname.replace(`/${locale}`, '');
    return pageHandler(request, path, locale);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
};

const pageHandler = async (request: Request, path: string, locale: string) => {
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
    if (!body) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    const response = NextResponse.next();
    response.headers.append('x-authenticated-user', body.userId);

    return response;
  }

  if (body) {
    return NextResponse.redirect(new URL(`/${locale}/management`, request.url));
  }

  return NextResponse.next();
};

export default pagesMiddleware;
