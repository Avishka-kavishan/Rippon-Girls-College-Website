import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from "firebase/storage";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

const STORAGE_KEY = "rippon_firebase_config";

export const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyBvuaa6AtUTtWfp2VQT23EQxyWxsM_iJbo",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "rippon-girls-college.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "rippon-girls-college",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "rippon-girls-college.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    "886238135230",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:886238135230:web:948fccaa8e1239aea8efef",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    "G-0VT2W6RRGQ",
};

export function getStoredFirebaseConfig(): FirebaseConfig | null {
  if (typeof window === "undefined") {
    return DEFAULT_FIREBASE_CONFIG;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch {
    // Ignore json parse error
  }

  return DEFAULT_FIREBASE_CONFIG;
}

export function saveStoredFirebaseConfig(config: FirebaseConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  cachedApp = null;
  cachedDb = null;
  cachedStorage = null;
}

export function removeStoredFirebaseConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  cachedApp = null;
  cachedDb = null;
  cachedStorage = null;
}

let cachedApp: FirebaseApp | null = null;
let cachedDb: Firestore | null = null;
let cachedStorage: FirebaseStorage | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  const config = getStoredFirebaseConfig();
  if (!config || !config.apiKey || !config.projectId) {
    return null;
  }

  if (cachedApp) {
    return cachedApp;
  }

  try {
    if (getApps().length > 0) {
      cachedApp = getApp();
    } else {
      cachedApp = initializeApp(config);
    }
    return cachedApp;
  } catch (err) {
    console.error("Failed to initialize Firebase app:", err);
    return null;
  }
}

export function getFirestoreDb(): Firestore | null {
  if (cachedDb) return cachedDb;
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    cachedDb = getFirestore(app);
    return cachedDb;
  } catch (err) {
    console.error("Failed to initialize Firestore:", err);
    return null;
  }
}

export function getFirebaseStorage(): FirebaseStorage | null {
  if (cachedStorage) return cachedStorage;
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    cachedStorage = getStorage(app);
    return cachedStorage;
  } catch (err) {
    console.error("Failed to initialize Firebase Storage:", err);
    return null;
  }
}

/**
 * Upload a file directly to Firebase Storage and return its public download URL
 */
export async function uploadFileToStorage(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) {
    throw new Error("Firebase Storage is not initialized or configured.");
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniquePath = `${folder}/${Date.now()}_${cleanName}`;
  const fileRef = ref(storage, uniquePath);

  const metadata = {
    contentType: file.type || "image/jpeg",
  };

  await uploadBytes(fileRef, file, metadata);
  const downloadUrl = await getDownloadURL(fileRef);
  return downloadUrl;
}


export const FIREBASE_RULES_SETUP = `// 1. FIRESTORE RULES (Firebase Console -> Firestore Database -> Rules):
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

// 2. STORAGE RULES (Firebase Console -> Storage -> Rules):
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
`;
