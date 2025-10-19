import { CollectionReference } from 'firebase-admin/firestore';
import { adminFirestore } from '../api/database';

import crypto from 'crypto';
import { moment } from './dayjs';
import { ApiResponse } from '../models/api-response';
import { OTP } from '../models/otp';
import { SmsUtils } from './sms';

const COUNT_TRESHOLD = 5;
const TRIES_TRESHOLD = 5;

export class OtpUtils {
  private static collection: CollectionReference = adminFirestore.collection('otp');

  private static getNewCode = () => crypto.randomInt(1000, 10000).toString();

  private static getDefaultOTP = (): OTP => ({
    code: this.getNewCode(),
    count: 0,
    tries: 0,
    ts: moment().valueOf(),
  });

  private static getOTP = async (path: string): Promise<OTP> => {
    const data = await this.collection.doc('/' + path).get();

    return (data.data() || this.getDefaultOTP()) as OTP;
  };

  public static trySendOTP = async (path: string, phone: string, branchId: string) => {
    let data = await this.getOTP(path);

    const isOtpActive = moment(data.ts).diff(moment(), 'hours') < 5;

    if (isOtpActive) {
      if (data.count >= COUNT_TRESHOLD) {
        throw ApiResponse.TooManyTries();
      }

      data.code = this.getNewCode();
    } else {
      data = this.getDefaultOTP();
    }

    data.count++;

    await SmsUtils.sendMessage(branchId, phone, `${data.code} הוא הקוד החד פעמי שלך לאימות.\n\n@line.beecomm.com #${data.code}`);

    await this.collection.doc('/' + path).set(data);
  };

  public static tryMatchOTP = async (path: string, code: string) => {
    const otp = await this.getOTP(path);

    if (!otp) {
      throw ApiResponse.UnknownError();
    }

    if (otp.tries >= TRIES_TRESHOLD) {
      throw ApiResponse.TooManyTries();
    }

    const success = otp.code === code;

    if (success) {
      await this.collection.doc('/' + path).delete();
    } else {
      otp.tries++;
      await this.collection.doc('/' + path).set(otp);
      throw ApiResponse.UnmatchedCode();
    }
  };
}
