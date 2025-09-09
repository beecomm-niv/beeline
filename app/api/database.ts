import * as admin from 'firebase-admin';
import * as adminApp from 'firebase-admin/app';
import * as adminDatabase from 'firebase-admin/database';
import * as adminAuth from 'firebase-admin/auth';

class Database {
  private static instance: Database;

  public app: admin.database.Database;
  public auth: adminAuth.Auth;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  private constructor() {
    let app;

    if (admin.apps.length === 0) {
      app = admin.initializeApp({
        credential: adminApp.cert({
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          projectId: process.env.FIREBASE_PROJECT_ID,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
    } else {
      app = admin.app();
    }

    this.app = adminDatabase.getDatabase(app);
    this.auth = adminAuth.getAuth(app);
  }
}

const databse = Database.getInstance();

export default databse;
