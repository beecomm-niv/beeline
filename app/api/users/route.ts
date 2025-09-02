import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
    });
    response.cookies.set({
      name: 'token',
      value: 'test',
      httpOnly: true, // לא נגיש מהדפדפן (שיקול אבטחה)
      secure: true, // חובה בפרודקשן עם HTTPS
      path: '/', // נגיש לכל האפליקציה
      maxAge: 60 * 60 * 24 * 7, // שבוע
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
