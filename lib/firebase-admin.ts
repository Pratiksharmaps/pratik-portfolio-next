import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined

    if (serviceAccountKey && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: serviceAccountKey,
        }),
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
