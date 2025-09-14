import { NextRequest, NextResponse } from 'next/server';
import { Route } from '../models/route';
import { UserRole } from '../models/user';
import { JwtUtils } from '../utils/jwt';
import { ApiResponse } from '../models/api-response';
import { JwtBody } from '../models/jwt-body';

const RoleLevel: Record<UserRole, number> = {
  super_admin: 3,
  admin: 2,
  user: 1,
};

const routes: Route[] = [
  {
    pathname: '/users/login',
    useAuthGuard: false,
  },

  {
    pathname: '/users/update',
    useAuthGuard: true,
    role: 'admin',
  },

  {
    pathname: '/users/signup',
    useAuthGuard: false,
  },

  {
    pathname: '/users/signout',
    useAuthGuard: false,
  },

  {
    pathname: '/users',
    useAuthGuard: false,
  },

  {
    pathname: '/branches/create',
    useAuthGuard: true,
    role: 'admin',
  },

  {
    pathname: '/branches/update',
    useAuthGuard: true,
    role: 'user',
  },

  {
    pathname: '/reservations/application/create',
    useAuthGuard: false,
  },

  {
    pathname: '/reservations/application/test',
    useAuthGuard: false,
  },
];

const apiMiddleware = async (request: NextRequest, route: string) => {
  try {
    const handler = routes.find((r) => r.pathname === route);

    if (!handler) {
      throw ApiResponse.NotFound();
    }

    let body: JwtBody | null = null;

    if (handler.useAuthGuard && handler.role) {
      const token = request.cookies.get('sessionId')?.value;

      if (!token) {
        throw ApiResponse.Unauthorized();
      }

      body = await JwtUtils.verifyToken<JwtBody>(token);
      if (!body?.role || RoleLevel[body.role] < RoleLevel[handler.role]) {
        throw ApiResponse.Unauthorized();
      }
    }

    const response = NextResponse.next();

    if (body) {
      response.headers.append('x-authenticated-user', body.userId);
    }

    return response;
  } catch (e) {
    if (e instanceof ApiResponse) {
      return NextResponse.json(e, { status: e.statusCode });
    }

    return NextResponse.json(ApiResponse.UnknownError(), { status: 500 });
  }
};

export default apiMiddleware;
