import * as admin from 'firebase-admin';
import * as admin_app from 'firebase-admin/app';
import * as admin_realtime_database from 'firebase-admin/database';
import * as admin_firestore from 'firebase-admin/firestore';
import * as admin_auth from 'firebase-admin/auth';

const app =
  admin.apps.length > 0
    ? admin.apps[0]
    : admin.initializeApp({
        credential: admin_app.cert({
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          projectId: process.env.FIREBASE_PROJECT_ID,
        }),

        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });

export const adminRealtimeDatabase = admin_realtime_database.getDatabase(app);
export const adminAuth = admin_auth.getAuth(app);
export const adminFirestore = admin_firestore.getFirestore(app);
