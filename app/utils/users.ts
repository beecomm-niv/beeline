import { Reference } from 'firebase-admin/database';
import databse from '../api/database';
import { User } from '../models/user';
import { createHash } from 'crypto';

export class UsersUtils {
  private static ref: Reference = databse.app.ref('users');

  public static getUserByUid = async (userId: string): Promise<User | null> => {
    const doc = await this.ref.child('/' + userId).get();

    return doc.val() || null;
  };

  public static convertEmailToUserId = (email: string) => createHash('md5').update(email).digest('hex');

  public static createUser = async (user: User) => {
    await this.ref.child('/' + user.userId).set(user);
  };
}
