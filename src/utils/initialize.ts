import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

let initializeAppCalled = false
export function initializeFirebaseApp() {
  if (!initializeAppCalled) {
    initializeAppCalled = true

    let credential = applicationDefault()
    // const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;

    // if (serviceAccountKey) {
    //   try {
    //     const key = serviceAccountKey.trim().startsWith('{')
    //       ? serviceAccountKey
    //       : Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
    //     credential = cert(JSON.parse(key));
    //   } catch (error) {
    //     console.warn('Failed to parse SERVICE_ACCOUNT_KEY', error);
    //   }
    // }

    initializeApp({
      credential,
    })
  }
  return {
    db: getFirestore()
  }
} 