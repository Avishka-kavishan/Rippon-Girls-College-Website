import { getSupabaseClient } from "@/lib/supabase";
import {
  defaultGalleryPhotos,
  defaultNewsData,
  defaultUpcomingEvents,
  defaultAdministration,
  defaultStudentPopulation,
  defaultAchievements,
  defaultContactDetails,
  defaultContactInquiries,
  defaultInitialSiteContent,
} from "@/data/defaultData";
import {
  GalleryItem,
  NewsItem,
  EventItem,
  AdminMember,
  StudentPopulationStats,
  AchievementItem,
  ContactPageDetails,
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
 * Fetch all content (tries Supabase first, falls back to LocalStorage & defaults)
 */
export async function getAllContent(): Promise<SiteContentState> {
  const local = getLocalCache();
  const supabase = getSupabaseClient();

  if (!supabase) {
    return local;
  }

  try {
    const { data, error } = await supabase.from("site_content").select("id, data");

    if (error) {
      console.warn("Supabase fetch warning, falling back to local:", error.message);
      return local;
    }

    if (data && data.length > 0) {
      const map: Record<string, any> = {};
      data.forEach((row) => {
        map[row.id] = row.data;
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
      };

      setLocalCache(merged);
      return merged;
    } else if (data && data.length === 0) {
      // Table exists but is empty; auto-seed with default initial content
      syncAllToSupabase().catch((e) => console.warn("Auto-seed error:", e));
      return local;
    }
  } catch (err) {
    console.warn("Supabase query error:", err);
  }

  return local;
}

/**
 * Generic save section
 */
export async function saveSection<K extends keyof SiteContentState>(
  section: K,
  value: SiteContentState[K]
): Promise<{ success: boolean; error?: string; usedSupabase: boolean }> {
  const current = getLocalCache();
  const updated: SiteContentState = {
    ...current,
    [section]: value,
  };
  setLocalCache(updated);

  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: true, usedSupabase: false };
  }

  try {
    const { error } = await supabase.from("site_content").upsert({
      id: section,
      data: value,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase upsert error:", error);
      return { success: true, usedSupabase: false, error: error.message };
    }

    return { success: true, usedSupabase: true };
  } catch (err: any) {
    return { success: true, usedSupabase: false, error: err.message };
  }
}

/**
 * Initialize / Seed Supabase with current content
 */
export async function syncAllToSupabase(): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Supabase is not configured." };
  }

  const current = getLocalCache();
  const rows = [
    { id: "gallery", data: current.gallery, updated_at: new Date().toISOString() },
    { id: "news", data: current.news, updated_at: new Date().toISOString() },
    { id: "events", data: current.events, updated_at: new Date().toISOString() },
    { id: "administration", data: current.administration, updated_at: new Date().toISOString() },
    { id: "studentPopulation", data: current.studentPopulation, updated_at: new Date().toISOString() },
    { id: "achievements", data: current.achievements, updated_at: new Date().toISOString() },
    { id: "contact", data: current.contact, updated_at: new Date().toISOString() },
    { id: "contactInquiries", data: current.contactInquiries || [], updated_at: new Date().toISOString() },
  ];

  try {
    const { error } = await supabase.from("site_content").upsert(rows);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Test Supabase Connection
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  tableExists: boolean;
  message: string;
}> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      connected: false,
      tableExists: false,
      message: "Supabase URL and Anon Key not configured.",
    };
  }

  try {
    const { data, error } = await supabase.from("site_content").select("id").limit(1);
    if (error) {
      if (error.code === "42P01" || error.message.includes("relation \"public.site_content\" does not exist")) {
        return {
          connected: true,
          tableExists: false,
          message: "Connected to Supabase, but the table 'site_content' has not been created yet. Please execute the SQL setup script.",
        };
      }
      return {
        connected: false,
        tableExists: false,
        message: `Connection failed: ${error.message}`,
      };
    }

    return {
      connected: true,
      tableExists: true,
      message: "Successfully connected to Supabase and verified 'site_content' table!",
    };
  } catch (err: any) {
    return {
      connected: false,
      tableExists: false,
      message: `Connection exception: ${err.message}`,
    };
  }
}

/**
 * Reset all content to default
 */
export async function resetContentToDefault(): Promise<void> {
  setLocalCache(defaultInitialSiteContent);
  const supabase = getSupabaseClient();
  if (supabase) {
    await syncAllToSupabase();
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
    };
    setLocalCache(merged);
    const supabase = getSupabaseClient();
    if (supabase) {
      await syncAllToSupabase();
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
): Promise<{ success: boolean; referenceId: string; usedSupabase: boolean }> {
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
  };
}
