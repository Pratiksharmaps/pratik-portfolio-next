import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  try {
    let serviceAccountKey = process.env.FIREBASE_PRIVATE_KEY
    if (serviceAccountKey) {
      serviceAccountKey = serviceAccountKey.trim()
      if (serviceAccountKey.startsWith('"') && serviceAccountKey.endsWith('"')) {
        serviceAccountKey = serviceAccountKey.slice(1, -1)
      }
      if (serviceAccountKey.startsWith("'") && serviceAccountKey.endsWith("'")) {
        serviceAccountKey = serviceAccountKey.slice(1, -1)
      }
      serviceAccountKey = serviceAccountKey.replace(/\\n/g, '\n')
    }

    if (serviceAccountKey && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: serviceAccountKey,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      })
      console.log('Firebase Admin initialized.')
    } else {
      console.warn('Firebase Admin failed to initialize: Missing environment variables.')
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error)
  }
}

export const db = admin.apps.length ? admin.firestore() : null
export const storage =
  admin.apps.length && process.env.FIREBASE_STORAGE_BUCKET
    ? admin.storage().bucket()
    : null
