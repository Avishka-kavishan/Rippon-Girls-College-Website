export interface GalleryItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  alt: string;
  span?: "featured" | "wide" | "standard" | "tall";
  createdAt?: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
  icon: string;
  image?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: string;
  date?: string;
  linkText?: string;
  href?: string;
  createdAt?: string;
}

export interface EventItem {
  id: string;
  month: string;
  day: string;
  title: string;
  time: string;
  venue: string;
  dateStr?: string;
}

export interface AdminMember {
  id: string;
  role: string;
  name: string;
  image: string;
  order?: number;
}

export interface StudentPopulationStats {
  totalCount: string;
  totalSubText: string;
  totalLabel: string;
  primaryCount: string;
  primarySubText: string;
  primaryLabel: string;
  secondaryCount: string;
  secondarySubText: string;
  secondaryLabel: string;
  alCount: string;
  alSubText: string;
  alLabel: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: string;
  linkText?: string;
  href?: string;
}

export interface SiteContentState {
  gallery: GalleryItem[];
  news: NewsItem[];
  events: EventItem[];
  administration: AdminMember[];
  studentPopulation: StudentPopulationStats;
  achievements: AchievementItem[];
}
