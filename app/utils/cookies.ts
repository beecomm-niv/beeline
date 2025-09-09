import { NextResponse } from 'next/server';

export class CookieUtils {
  public static setAuthCookie = (response: NextResponse, sessionId: string) => {
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: !sessionId ? 0 : 60 * 60 * 24 * 365,
    });
  };
}
