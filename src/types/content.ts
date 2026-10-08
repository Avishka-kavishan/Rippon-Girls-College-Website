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

export interface ContactDepartment {
  id: string;
  title: string;
  desc: string;
  phone: string;
  email: string;
  iconName?: string;
}

export interface ContactVisitingItem {
  id: string;
  title: string;
  desc: string;
  iconName?: string;
}

export interface ContactFaq {
  id: string;
  q: string;
  a: string;
}

export interface ContactPageDetails {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  address: string;
  generalPhone: string;
  principalPhone: string;
  primaryEmail: string;
  officialEmail: string;
  schoolHours: string;
  officeHours: string;
  mapEmbedUrl: string;
  mapPostalCode: string;
  mapCoordinates: string;
  departments: ContactDepartment[];
  visitingGuide: ContactVisitingItem[];
  faqs: ContactFaq[];
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  subject: string;
  message: string;
  submittedAt: string;
  referenceId: string;
  status: "unread" | "read" | "resolved";
}

export interface SiteContentState {
  gallery: GalleryItem[];
  news: NewsItem[];
  events: EventItem[];
  administration: AdminMember[];
  studentPopulation: StudentPopulationStats;
  achievements: AchievementItem[];
  contact: ContactPageDetails;
  contactInquiries?: ContactInquiry[];
}
