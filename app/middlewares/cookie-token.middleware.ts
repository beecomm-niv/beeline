import { NextRequest, NextResponse } from 'next/server';

const cookieTokenMiddleware = async (request: NextRequest) => {
  return NextResponse.next();
};

export default cookieTokenMiddleware;
