import { Reference } from 'firebase-admin/database';
import databse from '../api/database';
import { User, UserDTO } from '../models/user';

import * as crypto from 'crypto';

export class UsersUtils {
  private static ref: Reference = databse.app.ref('users');

  public static getUserByUid = async (userId: string): Promise<User | null> => {
    const doc = await this.ref.child('/' + userId).get();

    return doc.val() || null;
  };

  public static convertEmailToUserId = (email: string) => crypto.createHash('md5').update(email).digest('hex');

  public static createUser = async (user: User) => {
    await this.ref.child('/' + user.userId).set(user);
  };

  public static getUserDtoById = async (userId: string): Promise<UserDTO | null> => {
    const user = await this.getUserByUid(userId);

    if (user) {
      user.password = undefined!;
      user.userId = undefined!;
    }

    return user;
  };
}
