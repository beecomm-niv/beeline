import { CollectionReference } from 'firebase-admin/firestore';
import { adminFirestore } from '../api/database';
import { Customer } from '../models/customer';

export class CustomerUtils {
  private static collection: CollectionReference = adminFirestore.collection('customers');

  public static getCustomerByPhone = async (phone: string): Promise<Customer | null> => {
    const data = await this.collection.doc('/' + phone).get();

    return data.data() as Customer | null;
  };

  public static updateCustomer = async (customer: Customer) => {
    await this.collection.doc('/' + customer.phone).set(customer);
  };

  public static deleteCustomerByReservationId = async (id: string) => {
    const response = await this.collection.where('activeReservationId', '==', id).get();

    if (response.size > 0) {
      const customer = response.docs[0].data() as Customer;

      await this.collection.doc(`/${customer.phone}`).delete();
    }
  };
}
