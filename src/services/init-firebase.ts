import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_APP_ID, PUBLIC_FIREBASE_AUTH_DOMAIN, PUBLIC_FIREBASE_MEASUREMENT_ID, PUBLIC_FIREBASE_MESSAGING_SENDER_ID, PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_STORAGE_BUCKET } from '$env/static/public';
import { initializeApp } from '@firebase/app';
import { getStorage } from '@firebase/storage';

const firebase_config = {
 apiKey: PUBLIC_FIREBASE_API_KEY,
 authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
 projectId: PUBLIC_FIREBASE_PROJECT_ID,
 storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
 messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
 appId: PUBLIC_FIREBASE_APP_ID,
 measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const firebaseApp = initializeApp(firebase_config);
export const storage = getStorage(firebaseApp);
