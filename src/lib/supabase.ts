import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const STORAGE_KEY = "rippon_supabase_config";

const DEFAULT_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ofnmpgulhjsdqlezkrrz.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mbm1wZ3VsaGpzZHFsZXprcnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyNjk5MDYsImV4cCI6MjEwNjg0NTkwNn0.N0V2OUhW1NpxyQsZnSvuSme6iWRBEv2-WOM5z50XsKQ";

export function getStoredSupabaseConfig(): SupabaseConfig | null {
  if (typeof window === "undefined") {
    return { url: DEFAULT_SUPABASE_URL, anonKey: DEFAULT_SUPABASE_ANON_KEY };
  }

  // Check localStorage first (allows changing credentials dynamically in admin UI)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch {
    // ignore json error
  }

  // Fallback to configured defaults
  return { url: DEFAULT_SUPABASE_URL, anonKey: DEFAULT_SUPABASE_ANON_KEY };
}

export function saveStoredSupabaseConfig(config: SupabaseConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  cachedClient = null; // reset client cache
}

export function removeStoredSupabaseConfig(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  cachedClient = null;
}

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (!config || !config.url || !config.anonKey) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey);
    return cachedClient;
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error);
    return null;
  }
}

export const SUPABASE_SQL_SETUP = `-- Copy and execute this script in Supabase Dashboard -> SQL Editor:

-- 1. Create the site_content table
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.site_content enable row level security;

-- 3. Allow public read access to site content
create policy "Public read site_content"
  on public.site_content for select
  using (true);

-- 4. Allow write operations (Insert/Update/Delete) for anon and authenticated users
create policy "Allow all write site_content"
  on public.site_content for all
  using (true)
  with check (true);
`;
