import { getFirestoreDb } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import {
  defaultGalleryPhotos,
  defaultNewsData,
  defaultUpcomingEvents,
  defaultAdministration,
  defaultStudentPopulation,
  defaultAchievements,
  defaultContactDetails,
  defaultContactInquiries,
  defaultHeritageContent,
  defaultInitialSiteContent,
} from "@/data/defaultData";
import {
  ContactInquiry,
  SiteContentState,
} from "@/types/content";

const LOCAL_STORAGE_KEY = "rippon_site_content";
const CHANGE_EVENT = "rippon_content_changed";

/**
 * Dispatch custom event to notify components on the same page
 */
export function emitContentChange(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  }
}

/**
 * Subscribe to content changes in client components
 */
export function onContentChange(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

/**
 * Read current local cache
 */
function getLocalCache(): SiteContentState {
  if (typeof window === "undefined") {
    return defaultInitialSiteContent;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        gallery: parsed.gallery || defaultGalleryPhotos,
        news: parsed.news || defaultNewsData,
        events: parsed.events || defaultUpcomingEvents,
        administration: parsed.administration || defaultAdministration,
        studentPopulation: parsed.studentPopulation || defaultStudentPopulation,
        achievements: parsed.achievements || defaultAchievements,
        contact: parsed.contact
          ? { ...defaultContactDetails, ...parsed.contact }
          : defaultContactDetails,
        contactInquiries: Array.isArray(parsed.contactInquiries)
          ? parsed.contactInquiries
          : defaultContactInquiries,
        heritage: parsed.heritage
          ? {
              ...defaultHeritageContent,
              ...parsed.heritage,
              archivalImage:
                parsed.heritage.archivalImage &&
                !parsed.heritage.archivalImage.includes("bird view") &&
                !parsed.heritage.archivalImage.includes("school-building")
                  ? parsed.heritage.archivalImage
                  : defaultHeritageContent.archivalImage,
            }
          : defaultHeritageContent,
      };
    }
  } catch (e) {
    console.error("Error reading local cache:", e);
  }
  return defaultInitialSiteContent;
}

/**
 * Update local cache
 */
function setLocalCache(data: SiteContentState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    emitContentChange();
  } catch (e) {
    console.error("Error saving local cache:", e);
  }
}

/**
 * Fetch all content (tries Firebase Firestore first, falls back to LocalStorage & defaults)
 */
export async function getAllContent(): Promise<SiteContentState> {
  const local = getLocalCache();
  const db = getFirestoreDb();

  if (!db) {
    return local;
  }

  try {
    const colRef = collection(db, "site_content");
    const snapshot = await getDocs(colRef);

    if (!snapshot.empty) {
      const map: Record<string, any> = {};
      snapshot.forEach((docSnap) => {
        const val = docSnap.data();
        map[docSnap.id] = val && val.data !== undefined ? val.data : val;
      });

      const merged: SiteContentState = {
        gallery: map["gallery"] || local.gallery || defaultGalleryPhotos,
        news: map["news"] || local.news || defaultNewsData,
        events: map["events"] || local.events || defaultUpcomingEvents,
        administration: map["administration"] || local.administration || defaultAdministration,
        studentPopulation: map["studentPopulation"] || local.studentPopulation || defaultStudentPopulation,
        achievements: map["achievements"] || local.achievements || defaultAchievements,
        contact: map["contact"]
          ? { ...defaultContactDetails, ...map["contact"] }
          : (local.contact ? { ...defaultContactDetails, ...local.contact } : defaultContactDetails),
        contactInquiries: Array.isArray(map["contactInquiries"])
          ? map["contactInquiries"]
          : (Array.isArray(local.contactInquiries) ? local.contactInquiries : defaultContactInquiries),
        heritage: (() => {
          const base = map["heritage"] || local.heritage || defaultHeritageContent;
          return {
            ...defaultHeritageContent,
            ...base,
            archivalImage:
              base.archivalImage &&
              !base.archivalImage.includes("bird view") &&
              !base.archivalImage.includes("school-building")
                ? base.archivalImage
                : defaultHeritageContent.archivalImage,
          };
        })(),
      };

      setLocalCache(merged);
      return merged;
    } else {
      // Collection exists but is empty; auto-seed with default content
      syncAllToFirebase().catch((e) => console.warn("Firebase auto-seed error:", e));
      return local;
    }
  } catch (err) {
    console.warn("Firebase fetch warning, falling back to local cache:", err);
  }

  return local;
}

/**
 * Generic save section
 */
export async function saveSection<K extends keyof SiteContentState>(
  section: K,
  value: SiteContentState[K]
): Promise<{ success: boolean; error?: string; usedSupabase: boolean; usedFirebase?: boolean }> {
  const current = getLocalCache();
  const updated: SiteContentState = {
    ...current,
    [section]: value,
  };
  setLocalCache(updated);

  const db = getFirestoreDb();
  if (!db) {
    return { success: true, usedSupabase: false, usedFirebase: false };
  }

  try {
    const docRef = doc(db, "site_content", section);
    await setDoc(docRef, {
      data: value,
      updated_at: new Date().toISOString(),
    });
    return { success: true, usedSupabase: true, usedFirebase: true };
  } catch (err: any) {
    console.error("Firebase save error:", err);
    return { success: true, usedSupabase: false, usedFirebase: false, error: err?.message };
  }
}

/**
 * Initialize / Seed Firebase Firestore with current content
 */
export async function syncAllToFirebase(): Promise<{ success: boolean; error?: string }> {
  const db = getFirestoreDb();
  if (!db) {
    return { success: false, error: "Firebase is not configured." };
  }

  const current = getLocalCache();
  const sections: Array<{ id: string; data: any }> = [
    { id: "gallery", data: current.gallery },
    { id: "news", data: current.news },
    { id: "events", data: current.events },
    { id: "administration", data: current.administration },
    { id: "studentPopulation", data: current.studentPopulation },
    { id: "achievements", data: current.achievements },
    { id: "contact", data: current.contact },
    { id: "contactInquiries", data: current.contactInquiries || [] },
    { id: "heritage", data: current.heritage || defaultHeritageContent },
  ];

  try {
    for (const item of sections) {
      const docRef = doc(db, "site_content", item.id);
      await setDoc(docRef, {
        data: item.data,
        updated_at: new Date().toISOString(),
      });
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/** Backward compatibility alias */
export const syncAllToSupabase = syncAllToFirebase;

/**
 * Test Firebase Connection
 */
export async function testFirebaseConnection(): Promise<{
  connected: boolean;
  tableExists: boolean;
  message: string;
}> {
  const db = getFirestoreDb();
  if (!db) {
    return {
      connected: false,
      tableExists: false,
      message: "Firebase API key and project ID are not configured.",
    };
  }

  try {
    const testDoc = doc(db, "site_content", "gallery");
    await getDoc(testDoc);
    return {
      connected: true,
      tableExists: true,
      message: "Successfully connected to Firebase Firestore!",
    };
  } catch (err: any) {
    if (err?.code === "permission-denied") {
      return {
        connected: false,
        tableExists: false,
        message: "Connected to Firebase, but rules denied access. Make sure Firestore rules are set to Test mode (allow read, write: if true;).",
      };
    }
    return {
      connected: false,
      tableExists: false,
      message: `Connection error: ${err.message || err}`,
    };
  }
}

/** Backward compatibility alias */
export const testSupabaseConnection = testFirebaseConnection;

/**
 * Reset all content to default
 */
export async function resetContentToDefault(): Promise<void> {
  setLocalCache(defaultInitialSiteContent);
  const db = getFirestoreDb();
  if (db) {
    await syncAllToFirebase();
  }
}

/**
 * Export all content as JSON
 */
export function exportContentAsJSON(): string {
  const current = getLocalCache();
  return JSON.stringify(current, null, 2);
}

/**
 * Import all content from JSON
 */
export async function importContentFromJSON(jsonString: string): Promise<boolean> {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object") return false;
    const merged: SiteContentState = {
      gallery: parsed.gallery || defaultGalleryPhotos,
      news: parsed.news || defaultNewsData,
      events: parsed.events || defaultUpcomingEvents,
      administration: parsed.administration || defaultAdministration,
      studentPopulation: parsed.studentPopulation || defaultStudentPopulation,
      achievements: parsed.achievements || defaultAchievements,
      contact: parsed.contact
        ? { ...defaultContactDetails, ...parsed.contact }
        : defaultContactDetails,
      contactInquiries: Array.isArray(parsed.contactInquiries)
        ? parsed.contactInquiries
        : defaultContactInquiries,
      heritage: parsed.heritage
        ? { ...defaultHeritageContent, ...parsed.heritage }
        : defaultHeritageContent,
    };
    setLocalCache(merged);
    const db = getFirestoreDb();
    if (db) {
      await syncAllToFirebase();
    }
    return true;
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return false;
  }
}

/**
 * Submit a new Contact Inquiry from the Contact Page Form
 */
export async function submitContactInquiry(
  inquiry: Omit<ContactInquiry, "id" | "submittedAt" | "status" | "referenceId">
): Promise<{ success: boolean; referenceId: string; usedSupabase: boolean; usedFirebase?: boolean }> {
  const referenceId = `RGC-${new Date().getFullYear()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  const newEntry: ContactInquiry = {
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...inquiry,
    referenceId,
    submittedAt: new Date().toISOString(),
    status: "unread",
  };

  const current = getLocalCache();
  const updatedList = [newEntry, ...(current.contactInquiries || [])];

  const res = await saveSection("contactInquiries", updatedList);

  return {
    success: res.success,
    referenceId,
    usedSupabase: res.usedSupabase,
    usedFirebase: res.usedFirebase,
  };
}
