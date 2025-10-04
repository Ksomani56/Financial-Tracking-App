// Dynamic Firebase loader to avoid build-time errors if the SDK isn't installed yet
// or when running in environments without proper env vars.
export async function getDb() {
  try {
    const [{ initializeApp, getApps }, { getFirestore }] = await Promise.all([
      import("firebase/app"),
      import("firebase/firestore"),
    ])

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }

    console.log("Firebase Config:", firebaseConfig)
    
    if (!firebaseConfig.projectId) {
      console.error("Firebase projectId is undefined!")
      return null
    }

    const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig)
    return getFirestore(app)
  } catch (err) {
    console.error("Firebase initialization error:", err)
    return null
  }
}


