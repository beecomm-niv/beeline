import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '../models/api-response';

interface ImageUploadResponse {
  data: {
    FileName: string;
    Key: string;
  }[];
}

export class ImageUtils {
  private static BASE_URL = 'https://imageproxy.web.delivery';

  private static api: AxiosInstance = axios.create({
    baseURL: this.BASE_URL,
  });

  public static upload = async (data: FormData, branchId: string): Promise<string> => {
    const response = await this.api.post<ImageUploadResponse>('/api/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        branchId,
      },
    });

    if (!response.data.data.length) {
      throw ApiResponse.FailedToUploadImage();
    }

    return `${this.BASE_URL}/web/${branchId}/${response.data.data[0].Key}`;
  };
}
