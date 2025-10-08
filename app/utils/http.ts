import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../models/api-response';

type Handler<T> = () => Promise<ApiResponse<T>>;

export class HttpUtils {
  private static instace = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  });

  private static errorHandler = async <T>(handler: Handler<T>): Promise<ApiResponse<T>> => {
    try {
      return await handler();
    } catch (e) {
      if (e instanceof ApiResponse) {
        return e;
      }

      return {
        errorMessage: 'unknown error',
        hasError: true,
        statusCode: 500,
        value: null!,
      };
    }
  };

  public static post = async <T>(path: string, data: any, config?: AxiosRequestConfig<any>) =>
    this.errorHandler(async () => {
      const response = await this.instace.post<ApiResponse<T>>(path, data, config);

      return response.data;
    });
}
