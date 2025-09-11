import { Reference } from 'firebase-admin/database';
import databse from '../api/database';
import { Branch } from '../models/branch';

export class BranchUtils {
  private static ref: Reference = databse.app.ref('branches');

  public static createBranch = async (branch: Branch) => {
    await this.ref.child('/' + branch.id).set(branch);
  };

  public static getBranchById = async (id: string): Promise<Branch | null> => {
    const data = await this.ref.child('/' + id).get();

    return data.val() || null;
  };

  public static updateBranch = async (branch: Partial<Branch>) => {
    if (branch.id) {
      const id = branch.id;

      delete branch.id;

      await this.ref.child('/' + id).update(branch);
    }
  };
}
