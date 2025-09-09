import { NextResponse } from 'next/server';
import { ApiResponse } from '../models/api-response';

type Handler<T> = () => Promise<ApiResponse<T>>;

const errorHandler = async <T>(handler: Handler<T>) => {
  try {
    const response = await handler();

    return NextResponse.json(response);
  } catch (e) {
    console.log(e);
    if (e instanceof ApiResponse) {
      return NextResponse.json(e);
    }

    return NextResponse.json(ApiResponse.UnknownError());
  }
};

export default errorHandler;
