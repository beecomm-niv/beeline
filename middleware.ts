import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // דוגמה: בדיקת קיומו של cookie
  const token = request.cookies.get('token')?.value;

  console.log({ token }, request.url);

  // המשך רגיל
  return NextResponse.next();
}

// 🔑 קובע איפה המידלוואר יופעל
export const config = {
  matcher: ['/'],
};
