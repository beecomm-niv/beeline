import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '../models/locales';
import { Route } from '../models/route';
import { cookies } from 'next/headers';
import { JwtUtils } from '../utils/jwt';
import { JwtBody } from '../models/jwt-body';

interface UrlSettings {
  locale: string;
  path: string;
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

const getUrlSettings = (request: NextRequest): UrlSettings => {
  const segments = request.nextUrl.pathname.split('/').filter(Boolean);

  let locale = request.cookies.get('lang')?.value;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = locale = defaultLocale;
  }

  const isFirstSegmentLocale = segments.length > 0 && locales.includes(segments[0] as Locale);
  if (isFirstSegmentLocale) {
    if (segments[0] !== locale) {
    }

    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  const path = `/${segments.slice(1).join('/')}`;

  if (segments[0] === defaultLocale) {
    segments.shift();
  }
  return { locale, path };
};

const pagesMiddleware = async (request: NextRequest) => {
  try {
    const { locale, path } = getUrlSettings(request);

    const handler = routes.find((r) => {
      if (r.pathname.endsWith('/*')) {
        return path.startsWith(r.pathname.replace('/*', ''));
      }

      return r.pathname === path;
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
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }

    const nextURL = `${locale}${path}`;

    if (path !== request.nextUrl.pathname) {
      return NextResponse.redirect(new URL(path, request.url));
    }

    const next = request.nextUrl.clone();
    next.pathname = nextURL;

    const response = NextResponse.rewrite(next);

    if (authPayload) {
      response.headers.append('x-authenticated-user', authPayload.userId);
    }

    return response;
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export default pagesMiddleware;
