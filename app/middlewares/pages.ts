import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '../models/locales';
import { Route } from '../models/route';
import { cookies } from 'next/headers';
import { JwtUtils } from '../utils/jwt';
import { JwtBody } from '../models/jwt-body';
import { NextURL } from 'next/dist/server/web/next-url';

interface UrlSettings {
  locale: Locale;
  rewrite: NextURL | null;
  validPath: string;
}

const locales: Locale[] = ['he', 'en'];
const defaultLocale: Locale = 'he';

const routes: Route[] = [
  {
    pathname: '/login',
    useAuthGuard: false,
  },

  {
    pathname: '/management/*',
    useAuthGuard: true,
  },

  {
    pathname: '/reservation/*',
    useAuthGuard: false,
  },

  {
    pathname: '',
    useAuthGuard: false,
  },

  {
    pathname: '/track/*',
    useAuthGuard: false,
  },
];

const getUrlSettings = (requestUrl: NextURL): UrlSettings => {
  const currentPath = requestUrl.pathname;
  const response: UrlSettings = { locale: defaultLocale, rewrite: null, validPath: currentPath };

  const requestLocale = locales.find((locale) => currentPath.startsWith(`/${locale}`));

  if (requestLocale) {
    response.locale = requestLocale;
    response.validPath = currentPath.replace(`/${requestLocale}`, '');
  } else {
    response.rewrite = requestUrl.clone();
    response.rewrite.pathname = `/${defaultLocale}${currentPath}`;
  }

  return response;
};

const pagesMiddleware = async (request: NextRequest) => {
  const settings = getUrlSettings(request.nextUrl);

  const handler = routes.find((r) => {
    if (r.pathname.endsWith('/*')) {
      return settings.validPath.startsWith(r.pathname.replace('/*', ''));
    }

    return r.pathname === settings.validPath;
  });

  if (!handler) {
    return new NextResponse('Not Found', { status: 404 });
  }

  let authPayload: JwtBody | null = null;

  if (handler.useAuthGuard) {
    const c = await cookies();
    const token = c.get('sessionId')?.value;

    if (token) {
      authPayload = await JwtUtils.verifyToken<JwtBody>(token);
    }

    if (!authPayload) {
      return NextResponse.redirect(new URL(`/${settings.locale}/login`, request.url));
    }
  }

  const response: NextResponse = settings.rewrite ? NextResponse.rewrite(settings.rewrite) : NextResponse.next();

  if (authPayload) {
    response.headers.append('x-authenticated-user', authPayload.userId);
  }

  return response;
};

export default pagesMiddleware;
