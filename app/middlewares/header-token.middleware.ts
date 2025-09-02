import { NextRequest, NextResponse } from 'next/server';

const headerTokenMiddleware = async (request: NextRequest) => {
  return NextResponse.next();
};

export default headerTokenMiddleware;
