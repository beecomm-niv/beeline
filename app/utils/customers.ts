import { CollectionReference } from 'firebase-admin/firestore';
import { adminFirestore } from '../api/database';
import { Customer, OTP } from '../models/customer';

import crypto from 'crypto';
import { moment } from './dayjs';

export class CustomerUtils {
  private static collection: CollectionReference = adminFirestore.collection('customers');

  public static getCustomerByPhone = async (phone: string): Promise<Customer | null> => {
    const data = await this.collection.doc('/' + phone).get();

    return data.data() as Customer | null;
  };

  public static getCustomerByPhoneWithDefaultOTP = async (phone: string): Promise<Customer> => {
    let customer = await this.getCustomerByPhone(phone);

    if (!customer) {
      customer = {
        phone,
        hasActiveReservation: false,
        otp: undefined!,
      };
    }

    if (!customer.otp) {
      customer.otp = this.createOtp();
    }

    return customer;
  };

  public static getNewCode = () => crypto.randomInt(10000, 100000).toString();

  public static updateCustomer = async (customer: Customer) => {
    await this.collection.doc('/' + customer.phone).set(customer);
  };

  public static createOtp = (): OTP => ({
    code: this.getNewCode(),
    count: 0,
    tries: 0,
    ts: moment().valueOf(),
  });
}
