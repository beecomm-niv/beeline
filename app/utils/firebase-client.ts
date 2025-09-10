import { initializeApp } from 'firebase/app';

import * as clientDb from 'firebase/database';
import * as clientAuth from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDB7D8fcsJK1X_s3YzSQHinLZT3w8N_XBs',
  authDomain: 'beeline-7e29b.firebaseapp.com',
  databaseURL: 'https://beeline-7e29b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'beeline-7e29b',
  storageBucket: 'beeline-7e29b.firebasestorage.app',
  messagingSenderId: '131003654329',
  appId: '1:131003654329:web:9c922a8cd497bd2ffa7b68',
  measurementId: 'G-E0GNRMZ82J',
};

export class FirebaseClientUtils {
  public static auth: clientAuth.Auth;
  public static database: clientDb.Database;

  public static init = () => {
    const app = initializeApp(firebaseConfig);

    this.auth = clientAuth.getAuth(app);
    this.database = clientDb.getDatabase(app);
  };

  public static signIn = async (email: string, password: string) => {
    this.init();

    await clientAuth.signInWithEmailAndPassword(this.auth, email, password);
  };
}
