import { CollectionReference } from 'firebase-admin/firestore';
import { adminFirestore } from '../api/database';
import { SMS } from '../models/sms';
import { ApiResponse } from '../models/api-response';
import axios, { AxiosInstance } from 'axios';

interface MessageRequest {
  username: string;
  password: string;
  phoneNumber: string;
  message: string;
  nickname: string;
}

interface SmsResponse {
  error: boolean;
  message: string;
}

export class SmsUtils {
  private static collection: CollectionReference = adminFirestore.collection('sms');
  private static api: AxiosInstance = axios.create({
    baseURL: 'https://sendmessage.web.delivery/sendMessage',
  });

  public static setSms = async (branchId: string, sms: SMS) => {
    await this.collection.doc('/' + branchId).set(sms);
  };

  public static getSms = async (branchId: string): Promise<SMS | null> => {
    const data = await this.collection.doc('/' + branchId).get();

    return data.data() as SMS | null;
  };

  public static sendMessage = async (branchId: string, phoneNumber: string, message: string) => {
    const sms = await this.getSms(branchId);

    if (!sms) {
      throw ApiResponse.InvalidSmsSettings();
    }

    const body: MessageRequest = {
      message,
      nickname: sms.nickname,
      password: sms.password,
      phoneNumber,
      username: sms.username,
    };

    const response = await this.api.post<SmsResponse>('', body, {
      validateStatus: () => true,
    });

    if (response.data.error) {
      throw ApiResponse.SmsMessageError(response.data.message);
    }
  };
}
