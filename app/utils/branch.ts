import { Branch } from '../models/branch';
import { adminFirestore } from '../api/database';
import { CollectionReference } from 'firebase-admin/firestore';

export class BranchUtils {
  private static collection: CollectionReference = adminFirestore.collection('branches');

  public static createBranch = async (name: string): Promise<Branch> => {
    const doc = this.collection.doc();
    const data: Branch = { id: doc.id, name, lines: [] };

    await doc.set(data);

    return data;
  };

  public static getBranchById = async (id: string): Promise<Branch | null> => {
    const data = await this.collection.doc('/' + id).get();

    return (data.data() || null) as Branch | null;
  };

  public static updateBranch = async (branch: Partial<Branch>) => {
    if (branch.id) {
      const id = branch.id;

      delete branch.id;

      await this.collection.doc('/' + id).update(branch);
    }
  };
}
