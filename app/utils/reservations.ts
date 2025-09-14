import { CollectionReference } from 'firebase-admin/firestore';
import { adminFirestore } from '../api/database';

export class ReservationUtils {
  private static collection: CollectionReference = adminFirestore.collection('reservations');
}
