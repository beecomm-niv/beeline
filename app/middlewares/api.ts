import { NextRequest, NextResponse } from 'next/server';
import { Route } from '../models/route';

const routes: Route[] = [
  {
    pathname: '/users/login',
    useAuthGuard: false,
  },

  {
    pathname: '/users/signup',
    useAuthGuard: false,
  },

  {
    pathname: '/users',
    useAuthGuard: false,
  },
];

const apiMiddleware = (request: NextRequest, route: string) => {
  const handler = routes.find((r) => r.pathname === route);

  if (!handler) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.next();
};

export default apiMiddleware;
