import { User, UserDTO } from '../models/user';

import { CollectionReference } from 'firebase-admin/firestore';
import { adminFirestore } from '../api/database';

export class UsersUtils {
  private static collection: CollectionReference = adminFirestore.collection('users');

  public static getUserByUid = async (userId: string): Promise<User | null> => {
    const doc = await this.collection.doc('/' + userId).get();

    return (doc.data() || null) as User | null;
  };

  public static getUserByEmail = async (email: string): Promise<User | null> => {
    const data = await this.collection.where('email', '==', email).get();

    if (data.docs.length !== 1) {
      return null;
    }

    return data.docs[0].data() as User;
  };

  public static isEmailExist = async (email: string): Promise<boolean> => {
    const data = await this.collection.where('email', '==', email).get();

    return !data.empty;
  };

  public static createUser = async (email: string, password: string, name: string, phone: string): Promise<User> => {
    const doc = this.collection.doc();
    const data: User = {
      branchId: '',
      email,
      name,
      password,
      phone,
      role: 'user',
      userId: doc.id,
    };

    await doc.set(data);

    return data;
  };

  public static getUserDtoById = async (userId: string): Promise<UserDTO | null> => {
    const user = await this.getUserByUid(userId);

    if (user) {
      user.password = undefined!;
      user.userId = undefined!;
    }

    return user;
  };

  public static updateUser = async (data: User) => {
    const user: Partial<User> = { ...data };

    delete user.password;
    delete user.userId;
    delete user.email;
    delete user.role;

    await this.collection.doc('/' + data.userId).update(user);
  };
}
