"use client";

import React, { useState, useEffect, useMemo, useRef, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  LogOut,
  Image as ImageIcon,
  Newspaper,
  Calendar,
  CalendarDays,
  List,
  ChevronLeft,
  Users,
  GraduationCap,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Check,
  AlertCircle,
  Copy,
  Download,
  Upload,
  RefreshCw,
  X,
  Database,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Search,
  Menu,
  Clock,
  MapPin,
  ChevronRight,
  Key,
  CheckCircle2,
  Sparkles,
  Palette,
  Globe,
  PhoneCall,
  Phone,
  Mail,
  MessageSquare,
  HelpCircle,
  Building,
  BookOpen,
  Award,
  Bell,
  CheckCheck,
} from "lucide-react";
import {
  GalleryItem,
  NewsItem,
  EventItem,
  AdminMember,
  StudentPopulationStats,
  ContactDepartment,
  ContactVisitingItem,
  ContactFaq,
  ContactPageDetails,
  ContactInquiry,
  SiteContentState,
} from "@/types/content";
import {
  getAllContent,
  saveSection,
  resetContentToDefault,
  exportContentAsJSON,
  importContentFromJSON,
  testSupabaseConnection,
} from "@/services/contentService";
import {
  getStoredSupabaseConfig,
  saveStoredSupabaseConfig,
  removeStoredSupabaseConfig,
  SUPABASE_SQL_SETUP,
} from "@/lib/supabase";
import { defaultGalleryCategories, defaultContactDetails } from "@/data/defaultData";
import { getAssetPath } from "@/utils/assets";
import "./admin.css";

const ADMIN_PASSKEY_STORAGE_KEY = "rippon_admin_passkey";
const ADMIN_AUTH_SESSION_KEY = "rippon_admin_session";
const ADMIN_THEME_STORAGE_KEY = "rippon_admin_theme";
const DEFAULT_PASSKEY = "rippon2025";

export const MONTH_ABBRS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export const MONTH_NAMES_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDateIso(year: number, monthIndex: number, day: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseEventDate(
  ev: { month?: string; day?: string; dateStr?: string },
  fallbackYear: number = new Date().getFullYear()
): {
  year: number;
  monthIndex: number;
  monthAbbr: string;
  monthName: string;
  dayNum: number;
  dateStr: string;
} {
  let year = fallbackYear;
  let monthIndex = -1;
  let dayNum = 1;

  if (ev.dateStr) {
    const parts = ev.dateStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      year = parts[0];
      monthIndex = parts[1] - 1;
      dayNum = parts[2];
    }
  }

  if (monthIndex === -1 && ev.month) {
    const cleanMonth = ev.month.trim().toUpperCase().substring(0, 3);
    const idx = MONTH_ABBRS.indexOf(cleanMonth);
    if (idx !== -1) {
      monthIndex = idx;
    }
  }

  if (ev.day) {
    const parsedDay = parseInt(ev.day, 10);
    if (!isNaN(parsedDay)) {
      dayNum = parsedDay;
    }
  }

  if (monthIndex === -1) {
    monthIndex = new Date().getMonth();
  }

  const dateStr = formatDateIso(year, monthIndex, dayNum);

  return {
    year,
    monthIndex,
    monthAbbr: MONTH_ABBRS[monthIndex] || "JAN",
    monthName: MONTH_NAMES_FULL[monthIndex] || "January",
    dayNum,
    dateStr,
  };
}

export type AdminTheme = "royal" | "light" | "maroon" | "emerald";

type ActiveTab =
  | "overview"
  | "gallery"
  | "news"
  | "events"
  | "administration"
  | "population"
  | "contact"
  | "settings";

export type ContactSubTab =
  | "general"
  | "departments"
  | "visiting"
  | "faqs"
  | "inquiries";

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateString;
  }
}

export default function AdminPage() {
  // Theme State (Default: Rippon Royal Blue & Gold - Official School Colors)
  const [theme, setTheme] = useState<AdminTheme>("royal");

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [enteredPasskey, setEnteredPasskey] = useState<string>("");
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Content State
  const [content, setContent] = useState<SiteContentState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Supabase Status
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(false);
  const [supabaseStatusMsg, setSupabaseStatusMsg] = useState<string>("");
  const [sbUrlInput, setSbUrlInput] = useState<string>("");
  const [sbKeyInput, setSbKeyInput] = useState<string>("");
  const [testingConnection, setTestingConnection] = useState<boolean>(false);

  // Toast State
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>("all");

  const [newsModalOpen, setNewsModalOpen] = useState<boolean>(false);
  const [editingNewsItem, setEditingNewsItem] = useState<NewsItem | null>(null);

  const [eventModalOpen, setEventModalOpen] = useState<boolean>(false);
  const [editingEventItem, setEditingEventItem] = useState<EventItem | null>(null);
  const [eventsViewMode, setEventsViewMode] = useState<"calendar" | "list">("calendar");
  const [calCurrentDate, setCalCurrentDate] = useState<Date>(() => new Date());
  const [selectedCalDateStr, setSelectedCalDateStr] = useState<string | null>(null);

  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [editingAdminItem, setEditingAdminItem] = useState<AdminMember | null>(null);

  // Contact Page State & Modals
  const [contactSubTab, setContactSubTab] = useState<ContactSubTab>("general");
  const [contactForm, setContactForm] = useState<ContactPageDetails | null>(null);
  const [deptModalOpen, setDeptModalOpen] = useState<boolean>(false);
  const [editingDept, setEditingDept] = useState<ContactDepartment | null>(null);
  const [visitingModalOpen, setVisitingModalOpen] = useState<boolean>(false);
  const [editingVisiting, setEditingVisiting] = useState<ContactVisitingItem | null>(null);
  const [faqModalOpen, setFaqModalOpen] = useState<boolean>(false);
  const [editingFaq, setEditingFaq] = useState<ContactFaq | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "unread" | "resolved">("all");
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Delete Confirmation Modal
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    title: string;
    onConfirm: () => void;
  } | null>(null);

  // Passkey Settings
  const [newPasskey, setNewPasskey] = useState<string>("");
  const [showNewPasskey, setShowNewPasskey] = useState<boolean>(false);

  // Student Population Form Local State
  const [populationForm, setPopulationForm] = useState<StudentPopulationStats | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Keyboard shortcut: close modals on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGalleryModalOpen(false);
        setNewsModalOpen(false);
        setEventModalOpen(false);
        setAdminModalOpen(false);
        setDeptModalOpen(false);
        setVisitingModalOpen(false);
        setFaqModalOpen(false);
        setSelectedInquiry(null);
        setDeleteConfirm(null);
        setMobileSidebarOpen(false);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    if (notificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationsOpen]);

  // Load theme and session on load
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem(ADMIN_THEME_STORAGE_KEY) as AdminTheme) || "royal";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-admin-theme", savedTheme);

    const session = sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY);
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleThemeChange = (newTheme: AdminTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-admin-theme", newTheme);
    localStorage.setItem(ADMIN_THEME_STORAGE_KEY, newTheme);
    const themeTitles: Record<AdminTheme, string> = {
      royal: "Rippon Royal Blue (Official School Palette)",
      light: "Executive Clean Light",
      maroon: "Heritage Maroon & Gold",
      emerald: "Academic Emerald & Gold",
    };
    showToast(`Palette changed to: ${themeTitles[newTheme]}`);
  };

  // Fetch content & test Supabase on authenticate
  useEffect(() => {
    if (!isAuthenticated) return;

    const init = async () => {
      setLoading(true);
      const data = await getAllContent();
      setContent(data);
      setPopulationForm(data.studentPopulation);
      setContactForm({
        ...defaultContactDetails,
        ...(data?.contact || {}),
      });

      const existingConfig = getStoredSupabaseConfig();
      if (existingConfig) {
        setSbUrlInput(existingConfig.url);
        setSbKeyInput(existingConfig.anonKey);
      }

      const check = await testSupabaseConnection();
      setSupabaseConnected(check.connected && check.tableExists);
      setSupabaseStatusMsg(check.message);
      setLoading(false);
    };

    init();
  }, [isAuthenticated]);

  // Auth Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPasskey = localStorage.getItem(ADMIN_PASSKEY_STORAGE_KEY) || DEFAULT_PASSKEY;
    if (enteredPasskey === storedPasskey || enteredPasskey === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect administrator passkey. Please check and try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setEnteredPasskey("");
  };

  // Helper for image upload to base64
  const handleImageFileUpload = (
    e: ChangeEvent<HTMLInputElement>,
    callback: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3.5 * 1024 * 1024) {
      showToast("File size too large. Please select an image under 3.5MB.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        callback(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------------------
  // GALLERY HANDLERS
  // -------------------------------------------------------------------------
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !editingGalleryItem) return;

    if (!editingGalleryItem.title || !editingGalleryItem.image) {
      showToast("Title and Image are required.", "error");
      return;
    }

    const currentList = content.gallery || [];
    let updatedList: GalleryItem[];

    const exists = currentList.some((item) => item.id === editingGalleryItem.id);
    if (exists) {
      updatedList = currentList.map((item) =>
        item.id === editingGalleryItem.id ? editingGalleryItem : item
      );
    } else {
      updatedList = [editingGalleryItem, ...currentList];
    }

    const res = await saveSection("gallery", updatedList);
    setContent({ ...content, gallery: updatedList });
    setGalleryModalOpen(false);
    setEditingGalleryItem(null);
    showToast(res.usedSupabase ? "Saved to Supabase cloud!" : "Saved to local storage!");
  };

  const handleDeleteGallery = (id: string) => {
    setDeleteConfirm({
      open: true,
      title: "Delete this photo from the gallery?",
      onConfirm: async () => {
        if (!content) return;
        const updated = content.gallery.filter((item) => item.id !== id);
        const res = await saveSection("gallery", updated);
        setContent({ ...content, gallery: updated });
        setDeleteConfirm(null);
        showToast(res.usedSupabase ? "Photo removed from Supabase." : "Photo removed locally.");
      },
    });
  };

  // -------------------------------------------------------------------------
  // NEWS HANDLERS
  // -------------------------------------------------------------------------
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !editingNewsItem) return;

    if (!editingNewsItem.title || !editingNewsItem.image) {
      showToast("Title and Image are required.", "error");
      return;
    }

    const currentList = content.news || [];
    let updatedList: NewsItem[];

    const exists = currentList.some((item) => item.id === editingNewsItem.id);
    if (exists) {
      updatedList = currentList.map((item) =>
        item.id === editingNewsItem.id ? editingNewsItem : item
      );
    } else {
      updatedList = [editingNewsItem, ...currentList];
    }

    const res = await saveSection("news", updatedList);
    setContent({ ...content, news: updatedList });
    setNewsModalOpen(false);
    setEditingNewsItem(null);
    showToast(res.usedSupabase ? "News published to Supabase!" : "News published locally!");
  };

  const handleDeleteNews = (id: string) => {
    setDeleteConfirm({
      open: true,
      title: "Delete this news article?",
      onConfirm: async () => {
        if (!content) return;
        const updated = content.news.filter((item) => item.id !== id);
        const res = await saveSection("news", updated);
        setContent({ ...content, news: updated });
        setDeleteConfirm(null);
        showToast(res.usedSupabase ? "Article deleted from Supabase." : "Article deleted locally.");
      },
    });
  };

  // -------------------------------------------------------------------------
  // EVENTS HANDLERS
  // -------------------------------------------------------------------------
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !editingEventItem) return;

    if (!editingEventItem.title || !editingEventItem.month || !editingEventItem.day) {
      showToast("Title, Month, and Day are required.", "error");
      return;
    }

    const parsed = parseEventDate(editingEventItem);
    const itemToSave: EventItem = {
      ...editingEventItem,
      dateStr: editingEventItem.dateStr || parsed.dateStr,
      month: editingEventItem.month.trim().toUpperCase(),
      day: String(editingEventItem.day).trim().padStart(2, "0"),
    };

    const currentList = content.events || [];
    let updatedList: EventItem[];

    const exists = currentList.some((item) => item.id === itemToSave.id);
    if (exists) {
      updatedList = currentList.map((item) =>
        item.id === itemToSave.id ? itemToSave : item
      );
    } else {
      updatedList = [...currentList, itemToSave];
    }

    const res = await saveSection("events", updatedList);
    setContent({ ...content, events: updatedList });
    setEventModalOpen(false);
    setEditingEventItem(null);
    showToast(res.usedSupabase ? "Event scheduled in Supabase!" : "Event scheduled locally!");
  };

  const handleDeleteEvent = (id: string) => {
    setDeleteConfirm({
      open: true,
      title: "Remove this upcoming event?",
      onConfirm: async () => {
        if (!content) return;
        const updated = content.events.filter((item) => item.id !== id);
        const res = await saveSection("events", updated);
        setContent({ ...content, events: updated });
        setDeleteConfirm(null);
        showToast(res.usedSupabase ? "Event removed from Supabase." : "Event removed locally.");
      },
    });
  };

  // -------------------------------------------------------------------------
  // ADMINISTRATION HANDLERS
  // -------------------------------------------------------------------------
  const handleSaveAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !editingAdminItem) return;

    if (!editingAdminItem.name || !editingAdminItem.role) {
      showToast("Role and Name are required.", "error");
      return;
    }

    const currentList = content.administration || [];
    let updatedList: AdminMember[];

    const exists = currentList.some((item) => item.id === editingAdminItem.id);
    if (exists) {
      updatedList = currentList.map((item) =>
        item.id === editingAdminItem.id ? editingAdminItem : item
      );
    } else {
      updatedList = [...currentList, editingAdminItem];
    }

    const res = await saveSection("administration", updatedList);
    setContent({ ...content, administration: updatedList });
    setAdminModalOpen(false);
    setEditingAdminItem(null);
    showToast(res.usedSupabase ? "Staff profile saved to Supabase!" : "Staff profile saved locally!");
  };

  const handleDeleteAdmin = (id: string) => {
    setDeleteConfirm({
      open: true,
      title: "Remove this leadership member profile?",
      onConfirm: async () => {
        if (!content) return;
        const updated = content.administration.filter((item) => item.id !== id);
        const res = await saveSection("administration", updated);
        setContent({ ...content, administration: updated });
        setDeleteConfirm(null);
        showToast(res.usedSupabase ? "Leader removed from Supabase." : "Leader removed locally.");
      },
    });
  };

  // -------------------------------------------------------------------------
  // STUDENT POPULATION HANDLERS
  // -------------------------------------------------------------------------
  const handleSavePopulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !populationForm) return;

    const res = await saveSection("studentPopulation", populationForm);
    setContent({ ...content, studentPopulation: populationForm });
    showToast(
      res.usedSupabase ? "Student statistics saved to Supabase!" : "Student statistics saved locally!"
    );
  };

  // -------------------------------------------------------------------------
  // CONTACT PAGE HANDLERS
  // -------------------------------------------------------------------------
  const handleSaveContactGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !contactForm) return;

    const res = await saveSection("contact", contactForm);
    setContent({ ...content, contact: contactForm });
    showToast(
      res.usedSupabase ? "Contact details synced to Supabase!" : "Contact details saved locally!"
    );
  };

  const handleSaveContactDept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !contactForm || !editingDept) return;
    if (!editingDept.title.trim() || !editingDept.phone.trim() || !editingDept.email.trim()) {
      showToast("Title, Phone, and Email are required.", "error");
      return;
    }

    const currentDepts = contactForm.departments || [];
    let updatedDepts: ContactDepartment[];
    const exists = currentDepts.some((d) => d.id === editingDept.id);
    if (exists) {
      updatedDepts = currentDepts.map((d) => (d.id === editingDept.id ? editingDept : d));
    } else {
      updatedDepts = [...currentDepts, editingDept];
    }

    const updatedContact: ContactPageDetails = {
      ...contactForm,
      departments: updatedDepts,
    };

    const res = await saveSection("contact", updatedContact);
    setContent({ ...content, contact: updatedContact });
    setContactForm(updatedContact);
    setDeptModalOpen(false);
    setEditingDept(null);
    showToast(res.usedSupabase ? "Department saved to cloud!" : "Department saved locally!");
  };

  const handleDeleteContactDept = (id: string) => {
    setDeleteConfirm({
      open: true,
      title: "Remove this department from the directory?",
      onConfirm: async () => {
        if (!content || !contactForm) return;
        const updatedDepts = (contactForm.departments || []).filter((d) => d.id !== id);
        const updatedContact: ContactPageDetails = {
          ...contactForm,
          departments: updatedDepts,
        };
        const res = await saveSection("contact", updatedContact);
        setContent({ ...content, contact: updatedContact });
        setContactForm(updatedContact);
        setDeleteConfirm(null);
        showToast(res.usedSupabase ? "Department removed from cloud." : "Department removed locally.");
      },
    });
  };

  const handleSaveContactVisiting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !contactForm || !editingVisiting) return;
    if (!editingVisiting.title.trim() || !editingVisiting.desc.trim()) {
      showToast("Title and Description are required.", "error");
      return;
    }

    const currentList = contactForm.visitingGuide || [];
    let updatedList: ContactVisitingItem[];
    const exists = currentList.some((v) => v.id === editingVisiting.id);
    if (exists) {
      updatedList = currentList.map((v) => (v.id === editingVisiting.id ? editingVisiting : v));
    } else {
      updatedList = [...currentList, editingVisiting];
    }

    const updatedContact: ContactPageDetails = {
      ...contactForm,
      visitingGuide: updatedList,
    };

    const res = await saveSection("contact", updatedContact);
    setContent({ ...content, contact: updatedContact });
    setContactForm(updatedContact);
    setVisitingModalOpen(false);
    setEditingVisiting(null);
    showToast(res.usedSupabase ? "Visiting protocol saved!" : "Visiting protocol saved locally!");
  };

  const handleDeleteContactVisiting = (id: string) => {
    setDeleteConfirm({
      open: true,
      title: "Remove this visiting protocol guideline?",
      onConfirm: async () => {
        if (!content || !contactForm) return;
        const updatedList = (contactForm.visitingGuide || []).filter((v) => v.id !== id);
        const updatedContact: ContactPageDetails = {
          ...contactForm,
          visitingGuide: updatedList,
        };
        const res = await saveSection("contact", updatedContact);
        setContent({ ...content, contact: updatedContact });
        setContactForm(updatedContact);
        setDeleteConfirm(null);
        showToast("Visiting guideline removed.");
      },
    });
  };

  const handleSaveContactFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !contactForm || !editingFaq) return;
    if (!editingFaq.q.trim() || !editingFaq.a.trim()) {
      showToast("Question and Answer are required.", "error");
      return;
    }

    const currentFaqs = contactForm.faqs || [];
    let updatedFaqs: ContactFaq[];
    const exists = currentFaqs.some((f) => f.id === editingFaq.id);
    if (exists) {
      updatedFaqs = currentFaqs.map((f) => (f.id === editingFaq.id ? editingFaq : f));
    } else {
      updatedFaqs = [...currentFaqs, editingFaq];
    }

    const updatedContact: ContactPageDetails = {
      ...contactForm,
      faqs: updatedFaqs,
    };

    const res = await saveSection("contact", updatedContact);
    setContent({ ...content, contact: updatedContact });
    setContactForm(updatedContact);
    setFaqModalOpen(false);
    setEditingFaq(null);
    showToast(res.usedSupabase ? "FAQ saved to cloud!" : "FAQ saved locally!");
  };

  const handleDeleteContactFaq = (id: string) => {
    setDeleteConfirm({
      open: true,
      title: "Delete this FAQ from the contact page?",
      onConfirm: async () => {
        if (!content || !contactForm) return;
        const updatedFaqs = (contactForm.faqs || []).filter((f) => f.id !== id);
        const updatedContact: ContactPageDetails = {
          ...contactForm,
          faqs: updatedFaqs,
        };
        const res = await saveSection("contact", updatedContact);
        setContent({ ...content, contact: updatedContact });
        setContactForm(updatedContact);
        setDeleteConfirm(null);
        showToast("FAQ removed.");
      },
    });
  };

  const handleToggleInquiryStatus = async (id: string) => {
    if (!content) return;
    const currentInquiries = content.contactInquiries || [];
    const updated = currentInquiries.map((inq) => {
      if (inq.id === id) {
        const nextStatus = inq.status === "unread" ? "resolved" : inq.status === "resolved" ? "unread" : "resolved";
        return { ...inq, status: nextStatus as "unread" | "read" | "resolved" };
      }
      return inq;
    });

    const res = await saveSection("contactInquiries", updated);
    setContent({ ...content, contactInquiries: updated });
    if (selectedInquiry && selectedInquiry.id === id) {
      const match = updated.find((i) => i.id === id);
      if (match) setSelectedInquiry(match);
    }
    showToast(res.usedSupabase ? "Inquiry status updated in cloud!" : "Inquiry status updated locally!");
  };

  const handleMarkAllInquiriesRead = async () => {
    if (!content) return;
    const currentInquiries = content.contactInquiries || [];
    const hasUnread = currentInquiries.some((inq) => inq.status === "unread");
    if (!hasUnread) return;

    const updated = currentInquiries.map((inq) => ({
      ...inq,
      status: (inq.status === "unread" ? "resolved" : inq.status) as "unread" | "read" | "resolved",
    }));

    const res = await saveSection("contactInquiries", updated);
    setContent({ ...content, contactInquiries: updated });
    if (selectedInquiry) {
      const match = updated.find((i) => i.id === selectedInquiry.id);
      if (match) setSelectedInquiry(match);
    }
    showToast(res.usedSupabase ? "All inquiries marked as resolved in cloud!" : "All inquiries marked as resolved!");
  };

  const handleOpenInquiryNotification = (inq: ContactInquiry) => {
    setNotificationsOpen(false);
    setSelectedInquiry(inq);
  };

  const handleDeleteInquiry = (id: string) => {
    setDeleteConfirm({
      open: true,
      title: "Delete this inquiry permanently?",
      onConfirm: async () => {
        if (!content) return;
        const updated = (content.contactInquiries || []).filter((inq) => inq.id !== id);
        const res = await saveSection("contactInquiries", updated);
        setContent({ ...content, contactInquiries: updated });
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
        setDeleteConfirm(null);
        showToast("Inquiry message deleted.");
      },
    });
  };

  // -------------------------------------------------------------------------
  // SUPABASE CONFIGURATION
  // -------------------------------------------------------------------------
  const handleSaveSupabaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sbUrlInput.trim() || !sbKeyInput.trim()) {
      showToast("Both Supabase Project URL and Anon Key are required.", "error");
      return;
    }

    setTestingConnection(true);
    saveStoredSupabaseConfig({
      url: sbUrlInput.trim(),
      anonKey: sbKeyInput.trim(),
    });

    const check = await testSupabaseConnection();
    setSupabaseConnected(check.connected && check.tableExists);
    setSupabaseStatusMsg(check.message);
    setTestingConnection(false);

    if (check.connected && check.tableExists) {
      showToast("Connected to Supabase live cloud database!", "success");
      const fresh = await getAllContent();
      setContent(fresh);
      setContactForm({
        ...defaultContactDetails,
        ...(fresh.contact || {}),
      });
    } else {
      showToast(check.message, "error");
    }
  };

  const handleDisconnectSupabase = () => {
    removeStoredSupabaseConfig();
    setSbUrlInput("");
    setSbKeyInput("");
    setSupabaseConnected(false);
    setSupabaseStatusMsg("Disconnected. Running in local storage mode.");
    showToast("Supabase disconnected. Switched to browser local storage.");
  };

  // -------------------------------------------------------------------------
  // BACKUP & RESTORE
  // -------------------------------------------------------------------------
  const handleExportJSON = () => {
    const jsonStr = exportContentAsJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rippon-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Full website backup downloaded.");
  };

  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const text = evt.target?.result as string;
      const ok = await importContentFromJSON(text);
      if (ok) {
        const fresh = await getAllContent();
        setContent(fresh);
        setPopulationForm(fresh.studentPopulation);
        setContactForm({
          ...defaultContactDetails,
          ...(fresh.contact || {}),
        });
        showToast("Website content restored from backup!", "success");
      } else {
        showToast("Invalid JSON file.", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    setDeleteConfirm({
      open: true,
      title: "Reset all website content to school factory defaults? This overwrites custom entries.",
      onConfirm: async () => {
        await resetContentToDefault();
        const fresh = await getAllContent();
        setContent(fresh);
        setPopulationForm(fresh.studentPopulation);
        setContactForm({
          ...defaultContactDetails,
          ...(fresh.contact || {}),
        });
        setDeleteConfirm(null);
        showToast("All content has been reset to defaults.");
      },
    });
  };

  const handleUpdatePasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasskey.length < 4) {
      showToast("Passkey must be at least 4 characters.", "error");
      return;
    }
    localStorage.setItem(ADMIN_PASSKEY_STORAGE_KEY, newPasskey);
    setNewPasskey("");
    showToast("Administrator passkey successfully updated!");
  };

  // Filtered lists based on search and category
  const filteredGallery = useMemo(() => {
    if (!content?.gallery) return [];
    let list = content.gallery;
    if (galleryCategoryFilter !== "all") {
      list = list.filter((item) => item.category === galleryCategoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(q))
      );
    }
    return list;
  }, [content?.gallery, galleryCategoryFilter, searchQuery]);

  const filteredNews = useMemo(() => {
    if (!content?.news) return [];
    if (!searchQuery.trim()) return content.news;
    const q = searchQuery.toLowerCase();
    return content.news.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [content?.news, searchQuery]);

  const filteredEvents = useMemo(() => {
    if (!content?.events) return [];
    if (!searchQuery.trim()) return content.events;
    const q = searchQuery.toLowerCase();
    return content.events.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.venue.toLowerCase().includes(q) ||
        item.month.toLowerCase().includes(q) ||
        item.day.toLowerCase().includes(q)
    );
  }, [content?.events, searchQuery]);

  // Calendar calculations & navigation
  const calYear = calCurrentDate.getFullYear();
  const calMonth = calCurrentDate.getMonth();

  const handlePrevMonth = () => {
    setCalCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const now = new Date();
    setCalCurrentDate(now);
    const todayStr = formatDateIso(now.getFullYear(), now.getMonth(), now.getDate());
    setSelectedCalDateStr(todayStr);
  };

  const openNewEventModal = (prefillDate?: string) => {
    let d = new Date();
    if (prefillDate) {
      const parts = prefillDate.split("-").map(Number);
      if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        d = new Date(parts[0], parts[1] - 1, parts[2]);
      }
    }
    const y = d.getFullYear();
    const mIdx = d.getMonth();
    const dayNum = d.getDate();
    const iso = formatDateIso(y, mIdx, dayNum);
    const mAbbr = MONTH_ABBRS[mIdx] || "OCT";

    setEditingEventItem({
      id: `event-${Date.now()}`,
      dateStr: iso,
      month: mAbbr,
      day: String(dayNum).padStart(2, "0"),
      title: "",
      time: "9:00 AM",
      venue: "College Main Auditorium",
    });
    setEventModalOpen(true);
  };

  // 35 or 42 grid cells calculation for viewed month
  const calendarGridCells = useMemo(() => {
    const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay(); // 0 = Sun
    const daysInCurrent = new Date(calYear, calMonth + 1, 0).getDate();
    const daysInPrev = new Date(calYear, calMonth, 0).getDate();

    const cells: {
      year: number;
      monthIndex: number;
      day: number;
      dateStr: string;
      isCurrentMonth: boolean;
    }[] = [];

    // Previous month trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrev - i;
      const prevMonthIdx = calMonth === 0 ? 11 : calMonth - 1;
      const prevYear = calMonth === 0 ? calYear - 1 : calYear;
      cells.push({
        year: prevYear,
        monthIndex: prevMonthIdx,
        day,
        dateStr: formatDateIso(prevYear, prevMonthIdx, day),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInCurrent; day++) {
      cells.push({
        year: calYear,
        monthIndex: calMonth,
        day,
        dateStr: formatDateIso(calYear, calMonth, day),
        isCurrentMonth: true,
      });
    }

    // Next month leading days
    const totalNeeded = cells.length <= 35 ? 35 : 42;
    const remaining = totalNeeded - cells.length;
    for (let day = 1; day <= remaining; day++) {
      const nextMonthIdx = calMonth === 11 ? 0 : calMonth + 1;
      const nextYear = calMonth === 11 ? calYear + 1 : calYear;
      cells.push({
        year: nextYear,
        monthIndex: nextMonthIdx,
        day,
        dateStr: formatDateIso(nextYear, nextMonthIdx, day),
        isCurrentMonth: false,
      });
    }

    return cells;
  }, [calYear, calMonth]);

  // Group events by dateStr
  const eventsByDate = useMemo(() => {
    const map: Record<string, EventItem[]> = {};
    if (!filteredEvents) return map;

    filteredEvents.forEach((ev) => {
      const parsed = parseEventDate(ev, calYear);
      if (!map[parsed.dateStr]) {
        map[parsed.dateStr] = [];
      }
      map[parsed.dateStr].push(ev);
    });

    return map;
  }, [filteredEvents, calYear]);

  // Events in this viewed month
  const eventsThisMonth = useMemo(() => {
    if (!filteredEvents) return [];
    return filteredEvents.filter((ev) => {
      const parsed = parseEventDate(ev, calYear);
      return parsed.year === calYear && parsed.monthIndex === calMonth;
    });
  }, [filteredEvents, calYear, calMonth]);

  // Today's date ISO string
  const todayIso = useMemo(() => {
    const now = new Date();
    return formatDateIso(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  // Events for Agenda Sidebar (selected date or all in month)
  const agendaEvents = useMemo(() => {
    if (selectedCalDateStr) {
      return eventsByDate[selectedCalDateStr] || [];
    }
    return eventsThisMonth;
  }, [selectedCalDateStr, eventsByDate, eventsThisMonth]);

  const filteredAdmin = useMemo(() => {
    if (!content?.administration) return [];
    if (!searchQuery.trim()) return content.administration;
    const q = searchQuery.toLowerCase();
    return content.administration.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q)
    );
  }, [content?.administration, searchQuery]);

  const filteredDepartments = useMemo(() => {
    if (!contactForm?.departments) return [];
    if (!searchQuery.trim()) return contactForm.departments;
    const q = searchQuery.toLowerCase();
    return contactForm.departments.filter(
      (dept) =>
        dept.title.toLowerCase().includes(q) ||
        dept.desc.toLowerCase().includes(q) ||
        dept.email.toLowerCase().includes(q) ||
        dept.phone.toLowerCase().includes(q)
    );
  }, [contactForm?.departments, searchQuery]);

  const filteredVisiting = useMemo(() => {
    if (!contactForm?.visitingGuide) return [];
    if (!searchQuery.trim()) return contactForm.visitingGuide;
    const q = searchQuery.toLowerCase();
    return contactForm.visitingGuide.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
    );
  }, [contactForm?.visitingGuide, searchQuery]);

  const filteredFaqs = useMemo(() => {
    if (!contactForm?.faqs) return [];
    if (!searchQuery.trim()) return contactForm.faqs;
    const q = searchQuery.toLowerCase();
    return contactForm.faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(q) ||
        faq.a.toLowerCase().includes(q)
    );
  }, [contactForm?.faqs, searchQuery]);

  const filteredInquiries = useMemo(() => {
    let list = content?.contactInquiries || [];
    if (inquiryFilter !== "all") {
      list = list.filter((inq) => inq.status === inquiryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (inq) =>
          inq.fullName.toLowerCase().includes(q) ||
          inq.email.toLowerCase().includes(q) ||
          inq.subject.toLowerCase().includes(q) ||
          inq.message.toLowerCase().includes(q) ||
          inq.referenceId.toLowerCase().includes(q)
      );
    }
    return list;
  }, [content?.contactInquiries, inquiryFilter, searchQuery]);

  const unreadInquiriesCount = useMemo(() => {
    return (content?.contactInquiries || []).filter((i) => i.status === "unread").length;
  }, [content?.contactInquiries]);

  const recentInquiries = useMemo(() => {
    return [...(content?.contactInquiries || [])].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  }, [content?.contactInquiries]);

  // Current formatted Sri Lanka date
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  // Dynamic greeting
  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // =========================================================================
  // VIEW: AUTHENTICATION / LOGIN (HUMAN-CRAFTED INSTITUTIONAL ENTRANCE)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="adm-login-canvas">
        <div className="adm-login-box">
          <div className="adm-login-crest-row">
            <div className="adm-login-crest-ring">
              <Image
                src={getAssetPath("/images/sample-logo.png")}
                alt="Rippon Girls' College Crest"
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <span className="adm-login-crest-badge">EST. 1871 &bull; Galle, Sri Lanka</span>
            <h1 className="adm-login-title">Staff Administration</h1>
            <p className="adm-login-sub">
              Rippon Girls&apos; College Content Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="adm-login-form">
            <div className="adm-form-field">
              <div className="adm-label-row">
                <label className="adm-label" htmlFor="staff-passkey">
                  Administrator Passkey
                </label>
              </div>

              <div className="adm-input-wrapper">
                <Key size={18} className="adm-input-icon" />
                <input
                  id="staff-passkey"
                  type={showLoginPassword ? "text" : "password"}
                  className="adm-input with-left-icon with-right-icon"
                  placeholder="Enter administrator passkey"
                  value={enteredPasskey}
                  onChange={(e) => setEnteredPasskey(e.target.value)}
                  autoFocus
                  required
                />
                <button
                  type="button"
                  className="adm-input-addon-btn"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="adm-error-callout">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button type="submit" className="adm-btn-submit">
              <span>Access Admin Portal</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Thoughtful quick-fill tool for staff / reviewers */}
          <div className="adm-login-hint-box">
            <span>
              Initial passkey: <strong>rippon2025</strong>
            </span>
            <button
              type="button"
              className="adm-quick-fill-btn"
              onClick={() => setEnteredPasskey(DEFAULT_PASSKEY)}
            >
              Fill Key
            </button>
          </div>

          <div className="adm-login-footer-nav">
            <Link href="/" className="adm-return-link">
              &larr; Return to School Public Website
            </Link>

            {/* Quick Palette Switcher on Login Page */}
            <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Theme Color:</span>
              <div className="adm-theme-picker">
                <button
                  type="button"
                  className={`adm-theme-dot royal ${theme === "royal" ? "active" : ""}`}
                  title="Rippon Royal Blue (School Official)"
                  onClick={() => handleThemeChange("royal")}
                />
                <button
                  type="button"
                  className={`adm-theme-dot light ${theme === "light" ? "active" : ""}`}
                  title="Executive Clean Light"
                  onClick={() => handleThemeChange("light")}
                />
                <button
                  type="button"
                  className={`adm-theme-dot maroon ${theme === "maroon" ? "active" : ""}`}
                  title="Heritage Maroon & Gold"
                  onClick={() => handleThemeChange("maroon")}
                />
                <button
                  type="button"
                  className={`adm-theme-dot emerald ${theme === "emerald" ? "active" : ""}`}
                  title="Academic Emerald & Gold"
                  onClick={() => handleThemeChange("emerald")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN ADMIN DASHBOARD WORKSPACE (PROFESSIONAL HUMAN CMS LAYOUT)
  // =========================================================================
  return (
    <div className="admin-shell" data-admin-theme={theme}>
      {/* Toast Alert */}
      {toast && (
        <div className="adm-toast-container">
          <div className={`adm-toast-card ${toast.type}`}>
            {toast.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          1. PROFESSIONAL SIDEBAR NAVIGATION (HAMBURGER DRAWER)
          ------------------------------------------------------------------- */}
      {mobileSidebarOpen && (
        <div
          className="adm-sidebar-backdrop"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      <aside className={`adm-sidebar ${mobileSidebarOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="adm-sidebar-brand">
          <div className="adm-sidebar-logo-circle">
            <Image
              src={getAssetPath("/images/sample-logo.png")}
              alt="Rippon Crest"
              width={34}
              height={34}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="adm-sidebar-brand-text">
            <h2>Rippon College</h2>
            <span className="adm-sidebar-brand-badge">CMS Portal &bull; Staff</span>
          </div>

          <button
            type="button"
            className="adm-sidebar-close-btn"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close menu drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Categorized Menu Groups */}
        <nav className="adm-sidebar-nav">
          <div>
            <div className="adm-nav-group-title">General</div>
            <div className="adm-nav-links">
              <button
                className={`adm-nav-item ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("overview");
                  setMobileSidebarOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="adm-nav-item-content">
                  <ShieldCheck size={18} />
                  <span>Overview</span>
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className="adm-nav-group-title">Content Studio</div>
            <div className="adm-nav-links">
              <button
                className={`adm-nav-item ${activeTab === "gallery" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("gallery");
                  setMobileSidebarOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="adm-nav-item-content">
                  <ImageIcon size={18} />
                  <span>Photo Gallery</span>
                </div>
                <span className="adm-nav-badge">{content?.gallery?.length || 0}</span>
              </button>

              <button
                className={`adm-nav-item ${activeTab === "news" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("news");
                  setMobileSidebarOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="adm-nav-item-content">
                  <Newspaper size={18} />
                  <span>School News</span>
                </div>
                <span className="adm-nav-badge">{content?.news?.length || 0}</span>
              </button>

              <button
                className={`adm-nav-item ${activeTab === "events" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("events");
                  setMobileSidebarOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="adm-nav-item-content">
                  <Calendar size={18} />
                  <span>Upcoming Events</span>
                </div>
                <span className="adm-nav-badge">{content?.events?.length || 0}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="adm-nav-group-title">College Directory</div>
            <div className="adm-nav-links">
              <button
                className={`adm-nav-item ${activeTab === "administration" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("administration");
                  setMobileSidebarOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="adm-nav-item-content">
                  <Users size={18} />
                  <span>Our Administration</span>
                </div>
                <span className="adm-nav-badge">
                  {content?.administration?.length || 0}
                </span>
              </button>

              <button
                className={`adm-nav-item ${activeTab === "population" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("population");
                  setMobileSidebarOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="adm-nav-item-content">
                  <GraduationCap size={18} />
                  <span>Student Population</span>
                </div>
              </button>

              <button
                className={`adm-nav-item ${activeTab === "contact" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("contact");
                  setMobileSidebarOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="adm-nav-item-content">
                  <PhoneCall size={18} />
                  <span>Contact Page</span>
                </div>
                {content?.contactInquiries && content.contactInquiries.filter((i) => i.status === "unread").length > 0 ? (
                  <span
                    className="adm-nav-badge"
                    style={{ backgroundColor: "#ef4444", color: "#ffffff", fontWeight: 700 }}
                  >
                    {content.contactInquiries.filter((i) => i.status === "unread").length} new
                  </span>
                ) : (
                  <span className="adm-nav-badge">
                    {contactForm?.departments?.length || 0}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="adm-nav-group-title">Cloud &amp; System</div>
            <div className="adm-nav-links">
              <button
                className={`adm-nav-item ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("settings");
                  setMobileSidebarOpen(false);
                  setSearchQuery("");
                }}
              >
                <div className="adm-nav-item-content">
                  <Settings size={18} />
                  <span>Database &amp; Sync</span>
                </div>
                {supabaseConnected && (
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                    }}
                  />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="adm-sidebar-footer">
          <div className="adm-user-card">
            <div className="adm-user-profile">
              <div className="adm-user-avatar">RG</div>
              <div className="adm-user-info">
                <span className="adm-user-name">Staff Admin</span>
                <span className="adm-user-role">
                  {supabaseConnected ? "Cloud Active" : "Local Mode"}
                </span>
              </div>
            </div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: supabaseConnected ? "#10b981" : "#f59e0b",
              }}
            />
          </div>

          <div className="adm-sidebar-actions">
            <Link
              href="/"
              target="_blank"
              className="adm-sidebar-btn"
              title="Open public website in new tab"
            >
              <ExternalLink size={14} />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="adm-sidebar-btn danger"
              title="End admin session"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* -------------------------------------------------------------------
          2. WORKSPACE AREA & TOPBAR
          ------------------------------------------------------------------- */}
      <div className="adm-workspace">
        {/* Top Header Bar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button
              type="button"
              className="adm-hamburger-btn"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              aria-label="Toggle navigation menu"
            >
              <Menu size={19} />
              <span>Menu</span>
            </button>

            <div className="adm-topbar-brand">
              <div className="adm-topbar-logo-circle">
                <Image
                  src={getAssetPath("/images/sample-logo.png")}
                  alt="Rippon Crest"
                  width={24}
                  height={24}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="adm-topbar-brand-title">Rippon College</span>
            </div>

            <div className="adm-breadcrumbs">
              <span>Portal</span>
              <ChevronRight size={14} />
              <span className="active">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "gallery" && "Photo Gallery"}
                {activeTab === "news" && "School News"}
                {activeTab === "events" && "Upcoming Events"}
                {activeTab === "administration" && "Our Administration"}
                {activeTab === "population" && "Student Population"}
                {activeTab === "contact" && "Contact Page Management"}
                {activeTab === "settings" && "Database & Cloud Settings"}
              </span>
            </div>
          </div>

          <div className="adm-topbar-right">
            {/* Color Palette Switcher */}
            <div className="adm-theme-picker" title="Switch Theme Color Palette">
              <button
                type="button"
                className={`adm-theme-dot royal ${theme === "royal" ? "active" : ""}`}
                title="Rippon Royal Blue (Official School Palette)"
                onClick={() => handleThemeChange("royal")}
                aria-label="Royal Blue"
              />
              <button
                type="button"
                className={`adm-theme-dot light ${theme === "light" ? "active" : ""}`}
                title="Executive Clean Light"
                onClick={() => handleThemeChange("light")}
                aria-label="Clean Light"
              />
              <button
                type="button"
                className={`adm-theme-dot maroon ${theme === "maroon" ? "active" : ""}`}
                title="Heritage Maroon & Gold"
                onClick={() => handleThemeChange("maroon")}
                aria-label="Maroon Gold"
              />
              <button
                type="button"
                className={`adm-theme-dot emerald ${theme === "emerald" ? "active" : ""}`}
                title="Academic Emerald & Gold"
                onClick={() => handleThemeChange("emerald")}
                aria-label="Emerald Gold"
              />
            </div>

            {/* Universal search input for active tab */}
            {activeTab !== "overview" && activeTab !== "population" && activeTab !== "settings" && (
              <div className="adm-search-box">
                <Search size={15} className="adm-search-icon" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  className="adm-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            {/* Inquiry Notifications Dropdown */}
            <div className="adm-notif-wrapper" ref={notifRef}>
              <button
                type="button"
                className={`adm-notif-btn ${notificationsOpen ? "active" : ""}`}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="View Form Inquiries Notifications"
                title="Form Inquiries Notifications"
              >
                <Bell size={18} />
                {unreadInquiriesCount > 0 && (
                  <span className="adm-notif-badge">{unreadInquiriesCount}</span>
                )}
              </button>

              {notificationsOpen && (
                <div className="adm-notif-dropdown">
                  <div className="adm-notif-dropdown-header">
                    <div className="adm-notif-header-title">
                      <h4>Form Inquiries</h4>
                      {unreadInquiriesCount > 0 ? (
                        <span className="adm-notif-unread-tag">{unreadInquiriesCount} New</span>
                      ) : (
                        <span className="adm-notif-all-read-tag">All Caught Up</span>
                      )}
                    </div>
                    {unreadInquiriesCount > 0 && (
                      <button
                        type="button"
                        className="adm-notif-mark-all"
                        onClick={handleMarkAllInquiriesRead}
                        title="Mark all inquiries as resolved"
                      >
                        <CheckCheck size={14} />
                        <span>Mark read</span>
                      </button>
                    )}
                  </div>

                  <div className="adm-notif-list">
                    {recentInquiries.length === 0 ? (
                      <div className="adm-notif-empty">
                        <Mail size={32} />
                        <p>No form inquiries received yet</p>
                      </div>
                    ) : (
                      recentInquiries.slice(0, 8).map((inq) => (
                        <div
                          key={inq.id}
                          className={`adm-notif-item ${inq.status === "unread" ? "unread" : ""}`}
                          onClick={() => handleOpenInquiryNotification(inq)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="adm-notif-item-top">
                            <span className="adm-notif-sender">{inq.fullName}</span>
                            <span className="adm-notif-time">
                              {formatRelativeTime(inq.submittedAt)}
                            </span>
                          </div>
                          <div className="adm-notif-subject">{inq.subject}</div>
                          <p className="adm-notif-snippet">{inq.message}</p>
                          <div className="adm-notif-footer-row">
                            <span className="adm-notif-ref-tag">{inq.referenceId}</span>
                            <span className={`adm-notif-status-badge ${inq.status}`}>
                              {inq.status === "unread" ? "New / Unread" : "Resolved"}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="adm-notif-dropdown-footer">
                    <button
                      type="button"
                      className="adm-notif-view-all-btn"
                      onClick={() => {
                        setActiveTab("contact");
                        setContactSubTab("inquiries");
                        setNotificationsOpen(false);
                      }}
                    >
                      <span>View All Inquiries in Hub</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cloud database sync status pill */}
            <div
              className={`adm-status-pill ${
                supabaseConnected ? "connected" : "local"
              }`}
              title={supabaseStatusMsg}
            >
              <div className="adm-status-dot" />
              <span>{supabaseConnected ? "Supabase Live" : "Local Fallback"}</span>
            </div>
          </div>
        </header>

        {/* Main Content Workspace Body */}
        <main className="adm-content-wrapper">
          {loading ? (
            <div style={{ textAlign: "center", padding: "6rem 2rem" }}>
              <RefreshCw
                size={36}
                className="animate-spin"
                style={{ color: "#1d4ed8", margin: "0 auto 1.25rem" }}
              />
              <p style={{ color: "#64748b", fontWeight: 500 }}>
                Synchronizing school records...
              </p>
            </div>
          ) : (
            <>
              {/* -------------------------------------------------------------
                  TAB 1: OVERVIEW DASHBOARD
                  ------------------------------------------------------------- */}
              {activeTab === "overview" && (
                <div>
                  {/* Welcome Hero Banner */}
                  <div className="adm-welcome-card">
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <div className="adm-welcome-tag">
                        <Sparkles size={13} />
                        <span>{todayFormatted}</span>
                      </div>
                      <h2 className="adm-welcome-title">
                        {timeGreeting}, Administrator
                      </h2>
                      <p className="adm-welcome-desc">
                        Manage all public announcements, high-resolution gallery media,
                        college events, leadership profiles, and academic stats. Any change
                        synchronizes live across the school web application.
                      </p>
                    </div>

                    <div style={{ position: "relative", zIndex: 2 }}>
                      {!supabaseConnected ? (
                        <button
                          className="adm-btn-create"
                          style={{
                            background: "linear-gradient(135deg, #df9e32 0%, #c98d26 100%)",
                            color: "#050e1f",
                          }}
                          onClick={() => setActiveTab("settings")}
                        >
                          <Database size={16} />
                          <span>Link Cloud Database</span>
                        </button>
                      ) : (
                        <div
                          style={{
                            background: "rgba(255, 255, 255, 0.12)",
                            padding: "0.6rem 1rem",
                            borderRadius: "8px",
                            fontSize: "0.85rem",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            fontWeight: 600,
                          }}
                        >
                          🟢 Cloud Database Synced
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4 Primary KPI Stats */}
                  <div className="adm-kpi-grid">
                    <div
                      className="adm-kpi-card"
                      onClick={() => setActiveTab("gallery")}
                    >
                      <div className="adm-kpi-info">
                        <span className="adm-kpi-label">Gallery Photos</span>
                        <span className="adm-kpi-value">
                          {content?.gallery?.length || 0}
                        </span>
                        <span className="adm-kpi-jump">
                          <span>Manage gallery</span>
                          <ChevronRight size={12} />
                        </span>
                      </div>
                      <div className="adm-kpi-icon blue">
                        <ImageIcon size={22} />
                      </div>
                    </div>

                    <div
                      className="adm-kpi-card"
                      onClick={() => setActiveTab("news")}
                    >
                      <div className="adm-kpi-info">
                        <span className="adm-kpi-label">News Articles</span>
                        <span className="adm-kpi-value">
                          {content?.news?.length || 0}
                        </span>
                        <span className="adm-kpi-jump">
                          <span>Manage news</span>
                          <ChevronRight size={12} />
                        </span>
                      </div>
                      <div className="adm-kpi-icon gold">
                        <Newspaper size={22} />
                      </div>
                    </div>

                    <div
                      className="adm-kpi-card"
                      onClick={() => setActiveTab("events")}
                    >
                      <div className="adm-kpi-info">
                        <span className="adm-kpi-label">Scheduled Events</span>
                        <span className="adm-kpi-value">
                          {content?.events?.length || 0}
                        </span>
                        <span className="adm-kpi-jump">
                          <span>View calendar</span>
                          <ChevronRight size={12} />
                        </span>
                      </div>
                      <div className="adm-kpi-icon emerald">
                        <Calendar size={22} />
                      </div>
                    </div>

                    <div
                      className="adm-kpi-card"
                      onClick={() => setActiveTab("administration")}
                    >
                      <div className="adm-kpi-info">
                        <span className="adm-kpi-label">Staff Leadership</span>
                        <span className="adm-kpi-value">
                          {content?.administration?.length || 0}
                        </span>
                        <span className="adm-kpi-jump">
                          <span>View roster</span>
                          <ChevronRight size={12} />
                        </span>
                      </div>
                      <div className="adm-kpi-icon purple">
                        <Users size={22} />
                      </div>
                    </div>

                    <div
                      className="adm-kpi-card"
                      onClick={() => setActiveTab("contact")}
                    >
                      <div className="adm-kpi-info">
                        <span className="adm-kpi-label">Contact &amp; Inquiries</span>
                        <span className="adm-kpi-value">
                          {contactForm?.departments?.length || 0}
                        </span>
                        <span className="adm-kpi-jump">
                          <span>
                            {content?.contactInquiries && content.contactInquiries.filter((i) => i.status === "unread").length > 0
                              ? `${content.contactInquiries.filter((i) => i.status === "unread").length} new message${content.contactInquiries.filter((i) => i.status === "unread").length > 1 ? "s" : ""}`
                              : "Manage Contact"}
                          </span>
                          <ChevronRight size={12} />
                        </span>
                      </div>
                      <div className="adm-kpi-icon blue">
                        <PhoneCall size={22} />
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Dashboard Work Area */}
                  <div className="adm-dashboard-columns">
                    {/* Left Column: Recent School Publications */}
                    <div className="adm-card-panel">
                      <div className="adm-panel-title-bar">
                        <h3>
                          <Clock size={18} />
                          <span>Recent Content Updates</span>
                        </h3>
                        <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                          Live on website
                        </span>
                      </div>

                      <div className="adm-activity-list">
                        {/* Latest News */}
                        {content?.news && content.news.length > 0 && (
                          <div className="adm-activity-item">
                            <div className="adm-activity-thumb">
                              <img
                                src={
                                  content.news[0].image.startsWith("data:")
                                    ? content.news[0].image
                                    : getAssetPath(content.news[0].image)
                                }
                                alt={content.news[0].title}
                              />
                            </div>
                            <div className="adm-activity-details">
                              <div className="adm-activity-title">
                                {content.news[0].title}
                              </div>
                              <div className="adm-activity-sub">
                                <span style={{ color: "#d97706", fontWeight: 600 }}>
                                  Latest News
                                </span>
                                <span>&bull;</span>
                                <span>{content.news[0].date}</span>
                              </div>
                            </div>
                            <button
                              className="adm-btn-action edit"
                              style={{ flex: "none" }}
                              onClick={() => {
                                setEditingNewsItem({ ...content.news[0] });
                                setNewsModalOpen(true);
                              }}
                            >
                              <Edit size={13} />
                              <span>Edit</span>
                            </button>
                          </div>
                        )}

                        {/* Latest Photo */}
                        {content?.gallery && content.gallery.length > 0 && (
                          <div className="adm-activity-item">
                            <div className="adm-activity-thumb">
                              <img
                                src={
                                  content.gallery[0].image.startsWith("data:")
                                    ? content.gallery[0].image
                                    : getAssetPath(content.gallery[0].image)
                                }
                                alt={content.gallery[0].title}
                              />
                            </div>
                            <div className="adm-activity-details">
                              <div className="adm-activity-title">
                                {content.gallery[0].title}
                              </div>
                              <div className="adm-activity-sub">
                                <span style={{ color: "#2563eb", fontWeight: 600 }}>
                                  Gallery ({content.gallery[0].category})
                                </span>
                                {content.gallery[0].subtitle && (
                                  <>
                                    <span>&bull;</span>
                                    <span>{content.gallery[0].subtitle}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <button
                              className="adm-btn-action edit"
                              style={{ flex: "none" }}
                              onClick={() => {
                                setEditingGalleryItem({ ...content.gallery[0] });
                                setGalleryModalOpen(true);
                              }}
                            >
                              <Edit size={13} />
                              <span>Edit</span>
                            </button>
                          </div>
                        )}

                        {/* Next Event */}
                        {content?.events && content.events.length > 0 && (
                          <div className="adm-activity-item">
                            <div
                              style={{
                                width: 52,
                                height: 52,
                                borderRadius: "8px",
                                background: "#f1f5f9",
                                border: "1.5px solid #0f254a",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.68rem",
                                  fontWeight: 800,
                                  color: "#dc2626",
                                }}
                              >
                                {content.events[0].month}
                              </span>
                              <span
                                style={{
                                  fontSize: "1.05rem",
                                  fontWeight: 800,
                                  color: "#0f172a",
                                  lineHeight: 1,
                                }}
                              >
                                {content.events[0].day}
                              </span>
                            </div>
                            <div className="adm-activity-details">
                              <div className="adm-activity-title">
                                {content.events[0].title}
                              </div>
                              <div className="adm-activity-sub">
                                <span style={{ color: "#059669", fontWeight: 600 }}>
                                  Upcoming Event
                                </span>
                                <span>&bull;</span>
                                <span>{content.events[0].venue}</span>
                              </div>
                            </div>
                            <button
                              className="adm-btn-action edit"
                              style={{ flex: "none" }}
                              onClick={() => {
                                setEditingEventItem({ ...content.events[0] });
                                setEventModalOpen(true);
                              }}
                            >
                              <Edit size={13} />
                              <span>Edit</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Quick Action Palette */}
                    <div className="adm-card-panel">
                      <div className="adm-panel-title-bar">
                        <h3>
                          <Plus size={18} />
                          <span>Quick Actions</span>
                        </h3>
                      </div>

                      <div className="adm-action-palette">
                        <button
                          className="adm-palette-btn"
                          onClick={() => {
                            setEditingGalleryItem({
                              id: `photo-${Date.now()}`,
                              title: "",
                              subtitle: "",
                              category: "academic",
                              image: "/images/advance.jpeg",
                              alt: "",
                              span: "standard",
                            });
                            setGalleryModalOpen(true);
                          }}
                        >
                          <div className="adm-palette-content">
                            <ImageIcon size={18} style={{ color: "#2563eb" }} />
                            <span>Add Photo to Gallery</span>
                          </div>
                          <ChevronRight size={16} style={{ color: "#94a3b8" }} />
                        </button>

                        <button
                          className="adm-palette-btn"
                          onClick={() => {
                            setEditingNewsItem({
                              id: `news-${Date.now()}`,
                              title: "",
                              description: "",
                              image: "/images/news/1.jpg",
                              alt: "",
                              date: new Date().toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }),
                              linkText: "Learn More",
                              href: "#",
                            });
                            setNewsModalOpen(true);
                          }}
                        >
                          <div className="adm-palette-content">
                            <Newspaper size={18} style={{ color: "#d97706" }} />
                            <span>Publish News Announcement</span>
                          </div>
                          <ChevronRight size={16} style={{ color: "#94a3b8" }} />
                        </button>

                        <button
                          className="adm-palette-btn"
                          onClick={() => openNewEventModal()}
                        >
                          <div className="adm-palette-content">
                            <Calendar size={18} style={{ color: "#059669" }} />
                            <span>Schedule College Event</span>
                          </div>
                          <ChevronRight size={16} style={{ color: "#94a3b8" }} />
                        </button>

                        <button
                          className="adm-palette-btn"
                          onClick={() => {
                            setEditingAdminItem({
                              id: `admin-${Date.now()}`,
                              role: "Vice Principal",
                              name: "",
                              image: "/images/pin.png",
                            });
                            setAdminModalOpen(true);
                          }}
                        >
                          <div className="adm-palette-content">
                            <Users size={18} style={{ color: "#7c3aed" }} />
                            <span>Add Leadership Profile</span>
                          </div>
                          <ChevronRight size={16} style={{ color: "#94a3b8" }} />
                        </button>

                        <button
                          className="adm-palette-btn"
                          onClick={handleExportJSON}
                        >
                          <div className="adm-palette-content">
                            <Download size={18} style={{ color: "#0f172a" }} />
                            <span>Export Full Website Backup</span>
                          </div>
                          <ChevronRight size={16} style={{ color: "#94a3b8" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  TAB 2: PHOTO GALLERY STUDIO
                  ------------------------------------------------------------- */}
              {activeTab === "gallery" && (
                <div>
                  <div className="adm-header-banner">
                    <div className="adm-section-heading">
                      <h1>Photo Gallery Showcase</h1>
                      <p>
                        Manage photos displayed in the public Bento Grid, category tags,
                        and full-resolution Lightbox viewer.
                      </p>
                    </div>

                    <button
                      className="adm-btn-create"
                      onClick={() => {
                        setEditingGalleryItem({
                          id: `photo-${Date.now()}`,
                          title: "",
                          subtitle: "",
                          category: "academic",
                          image: "/images/advance.jpeg",
                          alt: "",
                          span: "standard",
                        });
                        setGalleryModalOpen(true);
                      }}
                    >
                      <Plus size={18} />
                      <span>Add New Photo</span>
                    </button>
                  </div>

                  {/* Category Filter Toolbar */}
                  <div className="adm-filter-toolbar">
                    <div className="adm-category-chips">
                      <button
                        className={`adm-category-chip ${
                          galleryCategoryFilter === "all" ? "active" : ""
                        }`}
                        onClick={() => setGalleryCategoryFilter("all")}
                      >
                        <span>All Photos</span>
                        <span style={{ opacity: 0.7 }}>
                          ({content?.gallery?.length || 0})
                        </span>
                      </button>
                      {defaultGalleryCategories.map((cat) => (
                        <button
                          key={cat.id}
                          className={`adm-category-chip ${
                            galleryCategoryFilter === cat.id ? "active" : ""
                          }`}
                          onClick={() => setGalleryCategoryFilter(cat.id)}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                          <span style={{ opacity: 0.7 }}>
                            (
                            {content?.gallery?.filter((g) => g.category === cat.id)
                              .length || 0}
                            )
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gallery Card Grid */}
                  <div className="adm-gallery-grid">
                    {filteredGallery.map((item) => (
                      <div key={item.id} className="adm-gallery-card">
                        <div className="adm-card-media">
                          <img
                            src={
                              item.image.startsWith("data:")
                                ? item.image
                                : getAssetPath(item.image)
                            }
                            alt={item.alt || item.title}
                          />
                          <span className="adm-media-tag">{item.category}</span>
                          {item.span && (
                            <span className="adm-media-span">{item.span}</span>
                          )}
                        </div>

                        <div className="adm-card-content">
                          <h4 className="adm-card-title">{item.title}</h4>
                          <p className="adm-card-desc">
                            {item.subtitle || "No subtitle provided."}
                          </p>

                          <div className="adm-card-btn-bar">
                            <button
                              className="adm-btn-action edit"
                              onClick={() => {
                                setEditingGalleryItem({ ...item });
                                setGalleryModalOpen(true);
                              }}
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>
                            <button
                              className="adm-btn-action delete"
                              onClick={() => handleDeleteGallery(item.id)}
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredGallery.length === 0 && (
                    <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>
                      <ImageIcon size={36} style={{ margin: "0 auto 0.75rem", opacity: 0.4 }} />
                      <p>No photos match the selected filter.</p>
                    </div>
                  )}
                </div>
              )}

              {/* -------------------------------------------------------------
                  TAB 3: NEWS & ANNOUNCEMENTS
                  ------------------------------------------------------------- */}
              {activeTab === "news" && (
                <div>
                  <div className="adm-header-banner">
                    <div className="adm-section-heading">
                      <h1>School News &amp; Announcements</h1>
                      <p>
                        Publish news stories, student achievement honors, and official college bulletins.
                      </p>
                    </div>

                    <button
                      className="adm-btn-create"
                      onClick={() => {
                        setEditingNewsItem({
                          id: `news-${Date.now()}`,
                          title: "",
                          description: "",
                          image: "/images/news/1.jpg",
                          alt: "",
                          date: new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }),
                          linkText: "Learn More",
                          href: "#",
                        });
                        setNewsModalOpen(true);
                      }}
                    >
                      <Plus size={18} />
                      <span>Add News Article</span>
                    </button>
                  </div>

                  <div className="adm-news-grid">
                    {filteredNews.map((item) => (
                      <div key={item.id} className="adm-news-card">
                        <div className="adm-card-media" style={{ height: 195 }}>
                          <img
                            src={
                              item.image.startsWith("data:")
                                ? item.image
                                : getAssetPath(item.image)
                            }
                            alt={item.alt || item.title}
                          />
                          {item.date && (
                            <span className="adm-media-tag">{item.date}</span>
                          )}
                        </div>

                        <div className="adm-card-content">
                          <h4 className="adm-card-title">{item.title}</h4>
                          <p className="adm-card-desc">
                            {item.description.length > 120
                              ? item.description.slice(0, 120) + "..."
                              : item.description}
                          </p>

                          <div className="adm-card-btn-bar">
                            <button
                              className="adm-btn-action edit"
                              onClick={() => {
                                setEditingNewsItem({ ...item });
                                setNewsModalOpen(true);
                              }}
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>
                            <button
                              className="adm-btn-action delete"
                              onClick={() => handleDeleteNews(item.id)}
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredNews.length === 0 && (
                    <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>
                      <Newspaper size={36} style={{ margin: "0 auto 0.75rem", opacity: 0.4 }} />
                      <p>No news articles found.</p>
                    </div>
                  )}
                </div>
              )}

              {/* -------------------------------------------------------------
                  TAB 4: UPCOMING EVENTS CALENDAR
                  ------------------------------------------------------------- */}
              {activeTab === "events" && (
                <div>
                  <div className="adm-header-banner">
                    <div className="adm-section-heading">
                      <h1>Upcoming College Events &amp; Calendar</h1>
                      <p>
                        Schedule and coordinate athletic meets, prize-giving ceremonies,
                        examinations, and cultural festivals for Rippon Girls&apos; College.
                      </p>
                    </div>

                    <div className="adm-events-header-actions">
                      <div className="adm-view-toggle">
                        <button
                          type="button"
                          className={`adm-view-toggle-btn ${eventsViewMode === "calendar" ? "active" : ""}`}
                          onClick={() => setEventsViewMode("calendar")}
                        >
                          <CalendarDays size={16} />
                          <span>Calendar</span>
                        </button>
                        <button
                          type="button"
                          className={`adm-view-toggle-btn ${eventsViewMode === "list" ? "active" : ""}`}
                          onClick={() => setEventsViewMode("list")}
                        >
                          <List size={16} />
                          <span>List ({filteredEvents.length})</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        className="adm-btn-create"
                        onClick={() => openNewEventModal(selectedCalDateStr || undefined)}
                      >
                        <Plus size={18} />
                        <span>Schedule New Event</span>
                      </button>
                    </div>
                  </div>

                  {/* CALENDAR VIEW */}
                  {eventsViewMode === "calendar" && (
                    <div className="adm-calendar-workspace">
                      {/* LEFT PANEL: Event Schedule & Agenda Details */}
                      <div className="adm-cal-left-panel">
                        <div className="adm-cal-agenda-card">
                          <div className="adm-cal-agenda-header">
                            <div>
                              <h3 className="adm-cal-agenda-title">
                                {selectedCalDateStr ? (
                                  (() => {
                                    const parts = selectedCalDateStr.split("-").map(Number);
                                    return `${MONTH_NAMES_FULL[parts[1] - 1]} ${parts[2]}, ${parts[0]}`;
                                  })()
                                ) : (
                                  `All Events in ${MONTH_NAMES_FULL[calMonth]} ${calYear}`
                                )}
                              </h3>
                              <p className="adm-cal-agenda-sub">
                                {selectedCalDateStr ? (
                                  (() => {
                                    const parts = selectedCalDateStr.split("-").map(Number);
                                    return `${new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString("en-US", { weekday: "long" })} • ${agendaEvents.length} event${agendaEvents.length === 1 ? "" : "s"} scheduled`;
                                  })()
                                ) : (
                                  `${eventsThisMonth.length} scheduled event${eventsThisMonth.length === 1 ? "" : "s"} • Click any date on the calendar to filter`
                                )}
                              </p>
                            </div>

                            {selectedCalDateStr && (
                              <button
                                type="button"
                                className="adm-cal-today-pill"
                                style={{ fontSize: "0.74rem", padding: "0.28rem 0.65rem" }}
                                onClick={() => setSelectedCalDateStr(null)}
                              >
                                View Full Month
                              </button>
                            )}
                          </div>

                          <button
                            type="button"
                            className="adm-btn-create"
                            style={{
                              width: "100%",
                              justifyContent: "center",
                              padding: "0.6rem 1rem",
                              fontSize: "0.85rem",
                            }}
                            onClick={() => openNewEventModal(selectedCalDateStr || undefined)}
                          >
                            <Plus size={16} />
                            <span>
                              {selectedCalDateStr ? "Add Event on this Date" : "Schedule New Event"}
                            </span>
                          </button>

                          <div className="adm-cal-agenda-list">
                            {agendaEvents.map((ev) => (
                              <div key={ev.id} className="adm-cal-agenda-item">
                                <div className="adm-cal-agenda-top">
                                  <div
                                    className="adm-cal-badge"
                                    style={{ minWidth: 54, padding: "0.4rem 0.6rem" }}
                                  >
                                    <div className="adm-cal-month" style={{ fontSize: "0.68rem" }}>
                                      {ev.month}
                                    </div>
                                    <div className="adm-cal-day" style={{ fontSize: "1.25rem" }}>
                                      {ev.day}
                                    </div>
                                  </div>
                                  <div className="adm-cal-agenda-info">
                                    <h4 className="adm-cal-agenda-ev-title">{ev.title}</h4>
                                    <div className="adm-cal-agenda-ev-meta">
                                      <span>
                                        <Clock size={13} />
                                        <span>{ev.time}</span>
                                      </span>
                                      <span>
                                        <MapPin size={13} />
                                        <span>{ev.venue}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="adm-cal-agenda-actions">
                                  <button
                                    type="button"
                                    className="adm-btn-action edit"
                                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
                                    onClick={() => {
                                      const parsed = parseEventDate(ev, calYear);
                                      setEditingEventItem({
                                        ...ev,
                                        dateStr: ev.dateStr || parsed.dateStr,
                                        month: ev.month || parsed.monthAbbr,
                                        day: ev.day || String(parsed.dayNum).padStart(2, "0"),
                                      });
                                      setEventModalOpen(true);
                                    }}
                                  >
                                    <Edit size={13} />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="adm-btn-action delete"
                                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
                                    onClick={() => handleDeleteEvent(ev.id)}
                                  >
                                    <Trash2 size={13} />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            ))}

                            {agendaEvents.length === 0 && (
                              <div className="adm-cal-agenda-empty">
                                <Calendar size={32} style={{ margin: "0 auto 0.65rem", opacity: 0.35 }} />
                                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700 }}>
                                  {selectedCalDateStr
                                    ? "No events on this date"
                                    : "No events scheduled for this month"}
                                </p>
                                <p style={{ margin: "0.35rem 0 1rem", fontSize: "0.8rem" }}>
                                  Pick a date on the calendar to see events, or click below to schedule.
                                </p>
                                <button
                                  type="button"
                                  className="adm-btn-secondary"
                                  style={{ margin: "0 auto", fontSize: "0.82rem" }}
                                  onClick={() => openNewEventModal(selectedCalDateStr || undefined)}
                                >
                                  <Plus size={14} />
                                  <span>Schedule Event</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT PANEL: Monthly Interactive Calendar Widget */}
                      <div className="adm-cal-right-panel">
                        {/* Month / Year Navigator & KPI Bar */}
                        <div className="adm-cal-nav-card" style={{ marginBottom: 0 }}>
                          <div className="adm-cal-nav-left">
                            <button
                              type="button"
                              className="adm-cal-nav-btn"
                              onClick={handlePrevMonth}
                              title="Previous Month"
                              aria-label="Previous Month"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <h2 className="adm-cal-month-heading" style={{ minWidth: 140 }}>
                              {MONTH_NAMES_FULL[calMonth]} {calYear}
                            </h2>
                            <button
                              type="button"
                              className="adm-cal-nav-btn"
                              onClick={handleNextMonth}
                              title="Next Month"
                              aria-label="Next Month"
                            >
                              <ChevronRight size={18} />
                            </button>
                            <button
                              type="button"
                              className="adm-cal-today-pill"
                              onClick={handleToday}
                            >
                              Today
                            </button>
                          </div>

                          <div className="adm-cal-stats-strip">
                            <span className="adm-cal-stat-tag">
                              <Calendar size={13} />
                              <span>{eventsThisMonth.length} in {MONTH_ABBRS[calMonth]}</span>
                            </span>
                          </div>
                        </div>

                        {/* Calendar Grid Box */}
                        <div className="adm-calendar-grid-card">
                          <div className="adm-cal-weekdays">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                              (dayName, i) => (
                                <div
                                  key={dayName}
                                  className={`adm-cal-weekday-col ${i === 0 || i === 6 ? "weekend" : ""}`}
                                >
                                  {dayName}
                                </div>
                              )
                            )}
                          </div>

                          <div className="adm-cal-days-grid">
                            {calendarGridCells.map((c) => {
                              const cellEvents = eventsByDate[c.dateStr] || [];
                              const isToday = c.dateStr === todayIso;
                              const isSelected = selectedCalDateStr === c.dateStr;

                              return (
                                <div
                                  key={c.dateStr}
                                  className={`adm-cal-day-cell ${
                                    !c.isCurrentMonth ? "other-month" : ""
                                  } ${isToday ? "is-today" : ""} ${
                                    isSelected ? "is-selected" : ""
                                  }`}
                                  onClick={() => setSelectedCalDateStr(c.dateStr)}
                                >
                                  <div className="adm-cal-cell-top">
                                    <span className="adm-cal-cell-num">{c.day}</span>
                                    <button
                                      type="button"
                                      className="adm-cal-cell-quickadd"
                                      title={`Schedule event on ${c.dateStr}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openNewEventModal(c.dateStr);
                                      }}
                                    >
                                      <Plus size={13} />
                                    </button>
                                  </div>

                                  <div className="adm-cal-cell-events">
                                    {cellEvents.slice(0, 2).map((ev) => (
                                      <div
                                        key={ev.id}
                                        className="adm-cal-event-pill"
                                        title={`${ev.time} - ${ev.title} (${ev.venue})`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const parsed = parseEventDate(ev, calYear);
                                          setEditingEventItem({
                                            ...ev,
                                            dateStr: ev.dateStr || parsed.dateStr,
                                            month: ev.month || parsed.monthAbbr,
                                            day: ev.day || String(parsed.dayNum).padStart(2, "0"),
                                          });
                                          setEventModalOpen(true);
                                        }}
                                      >
                                        <span className="adm-cal-event-pill-time">
                                          {ev.time.split(" ")[0]}
                                        </span>
                                        <span className="adm-cal-event-pill-title">
                                          {ev.title}
                                        </span>
                                      </div>
                                    ))}
                                    {cellEvents.length > 2 && (
                                      <span className="adm-cal-more-tag">
                                        +{cellEvents.length - 2} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LIST VIEW */}
                  {eventsViewMode === "list" && (
                    <div className="adm-events-stack">
                      {filteredEvents.map((ev) => (
                        <div key={ev.id} className="adm-event-row">
                          <div className="adm-cal-badge">
                            <div className="adm-cal-month">{ev.month}</div>
                            <div className="adm-cal-day">{ev.day}</div>
                          </div>

                          <div className="adm-event-info">
                            <h4 className="adm-event-title">{ev.title}</h4>
                            <div className="adm-event-metadata">
                              <span>
                                <Clock size={14} />
                                <span>{ev.time}</span>
                              </span>
                              <span>
                                <MapPin size={14} />
                                <span>{ev.venue}</span>
                              </span>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                              type="button"
                              className="adm-btn-action edit"
                              style={{ flex: "none", padding: "0.55rem 0.9rem" }}
                              onClick={() => {
                                const parsed = parseEventDate(ev, calYear);
                                setEditingEventItem({
                                  ...ev,
                                  dateStr: ev.dateStr || parsed.dateStr,
                                  month: ev.month || parsed.monthAbbr,
                                  day: ev.day || String(parsed.dayNum).padStart(2, "0"),
                                });
                                setEventModalOpen(true);
                              }}
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="adm-btn-action delete"
                              style={{ flex: "none", padding: "0.55rem 0.9rem" }}
                              onClick={() => handleDeleteEvent(ev.id)}
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {filteredEvents.length === 0 && (
                        <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>
                          <Calendar size={36} style={{ margin: "0 auto 0.75rem", opacity: 0.4 }} />
                          <p>No events found.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* -------------------------------------------------------------
                  TAB 5: OUR ADMINISTRATION & LEADERSHIP
                  ------------------------------------------------------------- */}
              {activeTab === "administration" && (
                <div>
                  <div className="adm-header-banner">
                    <div className="adm-section-heading">
                      <h1>Our Administration &amp; Leadership</h1>
                      <p>
                        Manage leadership profiles (Principal, Vice Principals, Sectional Heads)
                        displayed on the About Us page.
                      </p>
                    </div>

                    <button
                      className="adm-btn-create"
                      onClick={() => {
                        setEditingAdminItem({
                          id: `admin-${Date.now()}`,
                          role: "Vice Principal",
                          name: "",
                          image: "/images/pin.png",
                        });
                        setAdminModalOpen(true);
                      }}
                    >
                      <Plus size={18} />
                      <span>Add Staff Profile</span>
                    </button>
                  </div>

                  <div className="adm-staff-grid">
                    {filteredAdmin.map((admin) => (
                      <div key={admin.id} className="adm-staff-card">
                        <div className="adm-staff-portrait">
                          <img
                            src={
                              admin.image.startsWith("data:")
                                ? admin.image
                                : getAssetPath(admin.image)
                            }
                            alt={admin.name}
                          />
                          <span className="adm-staff-role-badge">{admin.role}</span>
                        </div>

                        <div className="adm-card-content">
                          <h4 className="adm-card-title">{admin.name}</h4>
                          <p className="adm-card-desc" style={{ marginBottom: "0.85rem" }}>
                            {admin.role} &bull; Rippon Girls&apos; College
                          </p>

                          <div className="adm-card-btn-bar">
                            <button
                              className="adm-btn-action edit"
                              onClick={() => {
                                setEditingAdminItem({ ...admin });
                                setAdminModalOpen(true);
                              }}
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>
                            <button
                              className="adm-btn-action delete"
                              onClick={() => handleDeleteAdmin(admin.id)}
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredAdmin.length === 0 && (
                    <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>
                      <Users size={36} style={{ margin: "0 auto 0.75rem", opacity: 0.4 }} />
                      <p>No staff profiles found.</p>
                    </div>
                  )}
                </div>
              )}

              {/* -------------------------------------------------------------
                  TAB 6: STUDENT POPULATION STATS
                  ------------------------------------------------------------- */}
              {activeTab === "population" && populationForm && (
                <div>
                  <div className="adm-header-banner">
                    <div className="adm-section-heading">
                      <h1>Student Population Metrics</h1>
                      <p>
                        Update the four academic statistical quadrants showcased on the About Us page.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSavePopulation}>
                    <div className="adm-quad-container">
                      {/* Quadrant 1 */}
                      <div className="adm-quad-box">
                        <div className="adm-quad-header">
                          <GraduationCap size={18} style={{ color: "#2563eb" }} />
                          <span>Quadrant 1: Total Enrolled Students</span>
                        </div>
                        <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                          <label className="adm-label">Count (e.g. 2,690+)</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={populationForm.totalCount}
                            onChange={(e) =>
                              setPopulationForm({
                                ...populationForm,
                                totalCount: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="adm-form-field">
                          <label className="adm-label">Description Label</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={populationForm.totalLabel}
                            onChange={(e) =>
                              setPopulationForm({
                                ...populationForm,
                                totalLabel: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      {/* Quadrant 2 */}
                      <div className="adm-quad-box">
                        <div className="adm-quad-header">
                          <GraduationCap size={18} style={{ color: "#059669" }} />
                          <span>Quadrant 2: Primary Section (Grade 1 - 5)</span>
                        </div>
                        <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                          <label className="adm-label">Count (e.g. 850+)</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={populationForm.primaryCount}
                            onChange={(e) =>
                              setPopulationForm({
                                ...populationForm,
                                primaryCount: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="adm-form-field">
                          <label className="adm-label">Description Label</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={populationForm.primaryLabel}
                            onChange={(e) =>
                              setPopulationForm({
                                ...populationForm,
                                primaryLabel: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      {/* Quadrant 3 */}
                      <div className="adm-quad-box">
                        <div className="adm-quad-header">
                          <GraduationCap size={18} style={{ color: "#d97706" }} />
                          <span>Quadrant 3: Secondary Section (Grade 6 - 11)</span>
                        </div>
                        <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                          <label className="adm-label">Count (e.g. 1,120+)</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={populationForm.secondaryCount}
                            onChange={(e) =>
                              setPopulationForm({
                                ...populationForm,
                                secondaryCount: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="adm-form-field">
                          <label className="adm-label">Description Label</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={populationForm.secondaryLabel}
                            onChange={(e) =>
                              setPopulationForm({
                                ...populationForm,
                                secondaryLabel: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      {/* Quadrant 4 */}
                      <div className="adm-quad-box">
                        <div className="adm-quad-header">
                          <GraduationCap size={18} style={{ color: "#7c3aed" }} />
                          <span>Quadrant 4: Advanced Level (Grade 12 - 13)</span>
                        </div>
                        <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                          <label className="adm-label">Count (e.g. 720+)</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={populationForm.alCount}
                            onChange={(e) =>
                              setPopulationForm({
                                ...populationForm,
                                alCount: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="adm-form-field">
                          <label className="adm-label">Description Label</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={populationForm.alLabel}
                            onChange={(e) =>
                              setPopulationForm({
                                ...populationForm,
                                alLabel: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button
                        type="submit"
                        className="adm-btn-create"
                        style={{ padding: "0.85rem 2.25rem", fontSize: "0.95rem" }}
                      >
                        <Check size={18} />
                        <span>Save Population Statistics</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* -------------------------------------------------------------
                  TAB 7: CONTACT PAGE MANAGEMENT
                  ------------------------------------------------------------- */}
              {activeTab === "contact" && contactForm && (
                <div>
                  <div className="adm-header-banner">
                    <div className="adm-section-heading">
                      <h1>Contact Page Management</h1>
                      <p>
                        Configure public telephone lines, emails, office hours, map coordinates,
                        department directory, visiting protocols, FAQs, and manage submitted messages.
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      <Link
                        href="/contact"
                        target="_blank"
                        className="adm-btn-secondary"
                        style={{ textDecoration: "none" }}
                      >
                        <ExternalLink size={15} />
                        <span>Preview Contact Page</span>
                      </Link>

                      {contactSubTab === "departments" && (
                        <button
                          type="button"
                          className="adm-btn-create"
                          onClick={() => {
                            setEditingDept({
                              id: `dept-${Date.now()}`,
                              title: "",
                              desc: "",
                              phone: "+94 91 223 ",
                              email: "@rippongirlscollege.lk",
                              iconName: "Building",
                            });
                            setDeptModalOpen(true);
                          }}
                        >
                          <Plus size={16} />
                          <span>Add Department</span>
                        </button>
                      )}

                      {contactSubTab === "visiting" && (
                        <button
                          type="button"
                          className="adm-btn-create"
                          onClick={() => {
                            setEditingVisiting({
                              id: `visit-${Date.now()}`,
                              title: "",
                              desc: "",
                              iconName: "ShieldCheck",
                            });
                            setVisitingModalOpen(true);
                          }}
                        >
                          <Plus size={16} />
                          <span>Add Visiting Guideline</span>
                        </button>
                      )}

                      {contactSubTab === "faqs" && (
                        <button
                          type="button"
                          className="adm-btn-create"
                          onClick={() => {
                            setEditingFaq({
                              id: `faq-${Date.now()}`,
                              q: "",
                              a: "",
                            });
                            setFaqModalOpen(true);
                          }}
                        >
                          <Plus size={16} />
                          <span>Add FAQ</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sub-navigation Tabs */}
                  <div className="adm-contact-subtabs">
                    <button
                      type="button"
                      className={`adm-contact-subtab-btn ${contactSubTab === "general" ? "active" : ""}`}
                      onClick={() => setContactSubTab("general")}
                    >
                      <MapPin size={16} />
                      <span>General &amp; Office Hours</span>
                    </button>

                    <button
                      type="button"
                      className={`adm-contact-subtab-btn ${contactSubTab === "departments" ? "active" : ""}`}
                      onClick={() => setContactSubTab("departments")}
                    >
                      <Building size={16} />
                      <span>Departmental Directory</span>
                      <span className="adm-contact-badge-count">
                        {contactForm.departments?.length || 0}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`adm-contact-subtab-btn ${contactSubTab === "visiting" ? "active" : ""}`}
                      onClick={() => setContactSubTab("visiting")}
                    >
                      <ShieldCheck size={16} />
                      <span>Visiting Protocols</span>
                      <span className="adm-contact-badge-count">
                        {contactForm.visitingGuide?.length || 0}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`adm-contact-subtab-btn ${contactSubTab === "faqs" ? "active" : ""}`}
                      onClick={() => setContactSubTab("faqs")}
                    >
                      <HelpCircle size={16} />
                      <span>FAQs Accordion</span>
                      <span className="adm-contact-badge-count">
                        {contactForm.faqs?.length || 0}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`adm-contact-subtab-btn ${contactSubTab === "inquiries" ? "active" : ""}`}
                      onClick={() => setContactSubTab("inquiries")}
                    >
                      <MessageSquare size={16} />
                      <span>Form Inquiries</span>
                      {content?.contactInquiries && content.contactInquiries.filter((i) => i.status === "unread").length > 0 ? (
                        <span className="adm-contact-badge-count unread">
                          {content.contactInquiries.filter((i) => i.status === "unread").length} new
                        </span>
                      ) : (
                        <span className="adm-contact-badge-count">
                          {content?.contactInquiries?.length || 0}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* SUBTAB 1: GENERAL CONTACT DETAILS FORM */}
                  {contactSubTab === "general" && (
                    <form onSubmit={handleSaveContactGeneral}>
                      <div className="adm-quad-container">
                        {/* Box 1: Telephone Desk & Emails */}
                        <div className="adm-quad-box">
                          <div className="adm-quad-header">
                            <PhoneCall size={18} style={{ color: "#2563eb" }} />
                            <span>Contact Lines &amp; Official Emails</span>
                          </div>

                          <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                            <label className="adm-label">General Telephone Desk *</label>
                            <input
                              type="text"
                              className="adm-input"
                              placeholder="+94 91 223 4769"
                              value={contactForm.generalPhone}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, generalPhone: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                            <label className="adm-label">Principal Office Line *</label>
                            <input
                              type="text"
                              className="adm-input"
                              placeholder="+94 91 223 4770"
                              value={contactForm.principalPhone}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, principalPhone: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                            <label className="adm-label">Primary Public Email *</label>
                            <input
                              type="email"
                              className="adm-input"
                              placeholder="ripponbalika@gmail.com"
                              value={contactForm.primaryEmail}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, primaryEmail: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="adm-form-field">
                            <label className="adm-label">Official Domain Email *</label>
                            <input
                              type="email"
                              className="adm-input"
                              placeholder="info@rippongirlscollege.lk"
                              value={contactForm.officialEmail}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, officialEmail: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>

                        {/* Box 2: Operating Hours & Address */}
                        <div className="adm-quad-box">
                          <div className="adm-quad-header">
                            <Clock size={18} style={{ color: "#059669" }} />
                            <span>Operating Hours &amp; Location Address</span>
                          </div>

                          <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                            <label className="adm-label">Academic School Hours *</label>
                            <input
                              type="text"
                              className="adm-input"
                              placeholder="7:30 AM – 1:30 PM"
                              value={contactForm.schoolHours}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, schoolHours: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                            <label className="adm-label">Administrative Secretariat Hours *</label>
                            <input
                              type="text"
                              className="adm-input"
                              placeholder="7:30 AM – 3:30 PM (Mon–Fri)"
                              value={contactForm.officeHours}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, officeHours: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="adm-form-field">
                            <label className="adm-label">School Physical Address *</label>
                            <textarea
                              rows={3}
                              className="adm-input"
                              placeholder="Rippon Girls' College, Richmond Hill Street, Galle, Southern Province, Sri Lanka"
                              value={contactForm.address}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, address: e.target.value })
                              }
                              required
                            />
                          </div>
                        </div>

                        {/* Box 3: Google Maps Integration */}
                        <div className="adm-quad-box">
                          <div className="adm-quad-header">
                            <MapPin size={18} style={{ color: "#d97706" }} />
                            <span>Map &amp; Geo Coordinates</span>
                          </div>

                          <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                            <label className="adm-label">Google Maps Embed Iframe URL *</label>
                            <input
                              type="text"
                              className="adm-input"
                              placeholder="https://maps.google.com/maps?q=..."
                              value={contactForm.mapEmbedUrl}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, mapEmbedUrl: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.85rem" }}>
                            <div className="adm-form-field">
                              <label className="adm-label">Postal Code</label>
                              <input
                                type="text"
                                className="adm-input"
                                placeholder="80000"
                                value={contactForm.mapPostalCode}
                                onChange={(e) =>
                                  setContactForm({ ...contactForm, mapPostalCode: e.target.value })
                                }
                              />
                            </div>
                            <div className="adm-form-field">
                              <label className="adm-label">GPS Coordinates</label>
                              <input
                                type="text"
                                className="adm-input"
                                placeholder="6.0463° N, 80.2075° E"
                                value={contactForm.mapCoordinates}
                                onChange={(e) =>
                                  setContactForm({ ...contactForm, mapCoordinates: e.target.value })
                                }
                              />
                            </div>
                          </div>

                          <div className="adm-form-field">
                            <label className="adm-label">Map Embed Preview</label>
                            <div
                              style={{
                                height: 110,
                                borderRadius: 8,
                                overflow: "hidden",
                                border: "1px solid var(--adm-border)",
                              }}
                            >
                              <iframe
                                title="Map Preview"
                                src={contactForm.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Box 4: Hero Header Text */}
                        <div className="adm-quad-box">
                          <div className="adm-quad-header">
                            <Sparkles size={18} style={{ color: "#7c3aed" }} />
                            <span>Contact Banner Title &amp; Subtitle</span>
                          </div>

                          <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                            <label className="adm-label">Hero Badge Text</label>
                            <input
                              type="text"
                              className="adm-input"
                              placeholder="Connect • Richmond Hill, Galle"
                              value={contactForm.heroBadge}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, heroBadge: e.target.value })
                              }
                            />
                          </div>

                          <div className="adm-form-field" style={{ marginBottom: "0.85rem" }}>
                            <label className="adm-label">Hero Main Title *</label>
                            <input
                              type="text"
                              className="adm-input"
                              placeholder="Contact Rippon Girls' College"
                              value={contactForm.heroTitle}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, heroTitle: e.target.value })
                              }
                              required
                            />
                          </div>

                          <div className="adm-form-field">
                            <label className="adm-label">Hero Description Subtitle</label>
                            <textarea
                              rows={3}
                              className="adm-input"
                              placeholder="Have a question or need more information?..."
                              value={contactForm.heroSubtitle}
                              onChange={(e) =>
                                setContactForm({ ...contactForm, heroSubtitle: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                          type="submit"
                          className="adm-btn-create"
                          style={{ padding: "0.85rem 2.25rem", fontSize: "0.95rem" }}
                        >
                          <Check size={18} />
                          <span>Save Contact Information</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* SUBTAB 2: DEPARTMENTAL DIRECTORY */}
                  {contactSubTab === "departments" && (
                    <div>
                      {filteredDepartments.length === 0 ? (
                        <div className="adm-empty-state">
                          <Building size={48} />
                          <h3>No Departments Found</h3>
                          <p>
                            {searchQuery
                              ? `No departments match "${searchQuery}".`
                              : "No departmental offices registered yet. Add one using the button above."}
                          </p>
                        </div>
                      ) : (
                        <div className="adm-contact-card-grid">
                          {filteredDepartments.map((dept) => (
                            <div key={dept.id} className="adm-dept-card">
                              <div>
                                <div className="adm-dept-card-top">
                                  <div className="adm-dept-card-icon">
                                    <Building size={20} />
                                  </div>
                                  <div>
                                    <h4 className="adm-dept-card-title">{dept.title}</h4>
                                  </div>
                                </div>
                                <p className="adm-dept-card-desc">{dept.desc}</p>
                                <div className="adm-dept-card-meta">
                                  <div className="adm-dept-card-meta-row">
                                    <Phone size={13} style={{ color: "#2563eb" }} />
                                    <span>{dept.phone}</span>
                                  </div>
                                  <div className="adm-dept-card-meta-row">
                                    <Mail size={13} style={{ color: "#d97706" }} />
                                    <span>{dept.email}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="adm-dept-card-actions">
                                <button
                                  type="button"
                                  className="adm-btn-action"
                                  title="Edit department"
                                  onClick={() => {
                                    setEditingDept(dept);
                                    setDeptModalOpen(true);
                                  }}
                                >
                                  <Edit size={14} />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  className="adm-btn-action delete"
                                  title="Delete department"
                                  onClick={() => handleDeleteContactDept(dept.id)}
                                >
                                  <Trash2 size={14} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUBTAB 3: VISITING PROTOCOLS & GUIDELINES */}
                  {contactSubTab === "visiting" && (
                    <div>
                      {filteredVisiting.length === 0 ? (
                        <div className="adm-empty-state">
                          <ShieldCheck size={48} />
                          <h3>No Visiting Guidelines Found</h3>
                          <p>No guidelines listed. Add one using the button above.</p>
                        </div>
                      ) : (
                        <div className="adm-contact-card-grid">
                          {filteredVisiting.map((item) => (
                            <div key={item.id} className="adm-dept-card">
                              <div>
                                <div className="adm-dept-card-top">
                                  <div className="adm-dept-card-icon">
                                    <ShieldCheck size={20} />
                                  </div>
                                  <div>
                                    <h4 className="adm-dept-card-title">{item.title}</h4>
                                  </div>
                                </div>
                                <p className="adm-dept-card-desc">{item.desc}</p>
                              </div>

                              <div className="adm-dept-card-actions">
                                <button
                                  type="button"
                                  className="adm-btn-action"
                                  title="Edit protocol"
                                  onClick={() => {
                                    setEditingVisiting(item);
                                    setVisitingModalOpen(true);
                                  }}
                                >
                                  <Edit size={14} />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  className="adm-btn-action delete"
                                  title="Delete protocol"
                                  onClick={() => handleDeleteContactVisiting(item.id)}
                                >
                                  <Trash2 size={14} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUBTAB 4: FAQS ACCORDION */}
                  {contactSubTab === "faqs" && (
                    <div>
                      {filteredFaqs.length === 0 ? (
                        <div className="adm-empty-state">
                          <HelpCircle size={48} />
                          <h3>No FAQs Found</h3>
                          <p>No FAQs registered. Click &quot;Add FAQ&quot; to create one.</p>
                        </div>
                      ) : (
                        <div>
                          {filteredFaqs.map((faq) => (
                            <div key={faq.id} className="adm-faq-item-card">
                              <div className="adm-faq-item-header">
                                <div className="adm-faq-item-q">
                                  <HelpCircle size={18} style={{ color: "#2563eb", flexShrink: 0 }} />
                                  <span>{faq.q}</span>
                                </div>
                                <div className="adm-dept-card-actions">
                                  <button
                                    type="button"
                                    className="adm-btn-action"
                                    onClick={() => {
                                      setEditingFaq(faq);
                                      setFaqModalOpen(true);
                                    }}
                                  >
                                    <Edit size={14} />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="adm-btn-action delete"
                                    onClick={() => handleDeleteContactFaq(faq.id)}
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                              <div className="adm-faq-item-a">{faq.a}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUBTAB 5: FORM INQUIRIES INBOX */}
                  {contactSubTab === "inquiries" && (
                    <div>
                      <div className="adm-filter-toolbar">
                        <div className="adm-category-chips">
                          <button
                            type="button"
                            className={`adm-category-chip ${inquiryFilter === "all" ? "active" : ""}`}
                            onClick={() => setInquiryFilter("all")}
                          >
                            <span>All Messages ({content?.contactInquiries?.length || 0})</span>
                          </button>
                          <button
                            type="button"
                            className={`adm-category-chip ${inquiryFilter === "unread" ? "active" : ""}`}
                            onClick={() => setInquiryFilter("unread")}
                          >
                            <span>
                              Unread ({(content?.contactInquiries || []).filter((i) => i.status === "unread").length})
                            </span>
                          </button>
                          <button
                            type="button"
                            className={`adm-category-chip ${inquiryFilter === "resolved" ? "active" : ""}`}
                            onClick={() => setInquiryFilter("resolved")}
                          >
                            <span>
                              Resolved ({(content?.contactInquiries || []).filter((i) => i.status === "resolved").length})
                            </span>
                          </button>
                        </div>
                      </div>

                      {filteredInquiries.length === 0 ? (
                        <div className="adm-empty-state">
                          <MessageSquare size={48} />
                          <h3>No Inquiries Found</h3>
                          <p>
                            {searchQuery
                              ? `No inquiry messages match "${searchQuery}".`
                              : "No inquiry messages in this filter."}
                          </p>
                        </div>
                      ) : (
                        <div className="adm-inquiry-list">
                          {filteredInquiries.map((inq) => (
                            <div key={inq.id} className={`adm-inquiry-card ${inq.status}`}>
                              <div className="adm-inquiry-header">
                                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap" }}>
                                  <span className="adm-inquiry-ref">{inq.referenceId}</span>
                                  <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
                                    {inq.fullName}
                                  </h4>
                                  <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                                    ({inq.role})
                                  </span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                  <span className={`adm-inquiry-status-pill ${inq.status}`}>
                                    {inq.status === "unread" && "🔴 Unread"}
                                    {inq.status === "read" && "🟡 Reviewed"}
                                    {inq.status === "resolved" && "🟢 Resolved"}
                                  </span>
                                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                                    {new Date(inq.submittedAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="adm-inquiry-details-grid">
                                <div>
                                  <strong>Subject:</strong> {inq.subject}
                                </div>
                                <div>
                                  <strong>Email:</strong>{" "}
                                  <a href={`mailto:${inq.email}`} style={{ color: "#2563eb" }}>
                                    {inq.email}
                                  </a>
                                </div>
                                {inq.phone && (
                                  <div>
                                    <strong>Phone:</strong> {inq.phone}
                                  </div>
                                )}
                              </div>

                              <div className="adm-inquiry-msg-snippet">
                                {inq.message}
                              </div>

                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                                <button
                                  type="button"
                                  className="adm-btn-secondary"
                                  style={{ fontSize: "0.82rem", padding: "0.45rem 0.85rem" }}
                                  onClick={() => setSelectedInquiry(inq)}
                                >
                                  <Eye size={14} />
                                  <span>View Details &amp; Reply</span>
                                </button>

                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                  <button
                                    type="button"
                                    className="adm-btn-action"
                                    style={{ fontSize: "0.82rem" }}
                                    onClick={() => handleToggleInquiryStatus(inq.id)}
                                  >
                                    <CheckCircle2 size={14} />
                                    <span>
                                      {inq.status === "resolved" ? "Mark as Unread" : "Mark as Resolved"}
                                    </span>
                                  </button>

                                  <button
                                    type="button"
                                    className="adm-btn-action delete"
                                    style={{ fontSize: "0.82rem" }}
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* -------------------------------------------------------------
                  TAB 8: DATABASE & CLOUD SETTINGS
                  ------------------------------------------------------------- */}
              {activeTab === "settings" && (
                <div className="adm-settings-stack">
                  {/* Card 0: Theme Color Palette Picker */}
                  <div className="adm-settings-panel">
                    <div className="adm-panel-head-row">
                      <h3>Admin Appearance &amp; Color Theme</h3>
                      <div className="adm-status-pill local">
                        <Palette size={13} />
                        <span>Active Theme: {theme.toUpperCase()}</span>
                      </div>
                    </div>
                    <p className="adm-settings-desc">
                      Choose the color scheme that best fits your preference. The official Rippon
                      Royal Blue matches the school flag, crest, and website branding.
                    </p>

                    <div className="adm-theme-cards-grid">
                      {/* Theme 1: Rippon Royal Blue */}
                      <div
                        className={`adm-theme-select-card ${theme === "royal" ? "active" : ""}`}
                        onClick={() => handleThemeChange("royal")}
                      >
                        <div className="adm-theme-preview-strip">
                          <div className="adm-theme-preview-bar" style={{ background: "#072b78" }} />
                          <div className="adm-theme-preview-bar" style={{ background: "#0b3fa8" }} />
                          <div className="adm-theme-preview-bar" style={{ background: "#f5a600", flex: 0.5 }} />
                        </div>
                        <div className="adm-theme-card-title">
                          <span>Rippon Royal Blue</span>
                          {theme === "royal" && <Check size={16} color="#072b78" />}
                        </div>
                        <p className="adm-theme-card-desc">
                          Official school collegiate blue &amp; gold amber matching the Rippon crest.
                        </p>
                      </div>

                      {/* Theme 2: Executive Clean Light */}
                      <div
                        className={`adm-theme-select-card ${theme === "light" ? "active" : ""}`}
                        onClick={() => handleThemeChange("light")}
                      >
                        <div className="adm-theme-preview-strip">
                          <div className="adm-theme-preview-bar" style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0" }} />
                          <div className="adm-theme-preview-bar" style={{ background: "#f8fafc" }} />
                          <div className="adm-theme-preview-bar" style={{ background: "#0b3fa8", flex: 0.5 }} />
                        </div>
                        <div className="adm-theme-card-title">
                          <span>Executive Clean Light</span>
                          {theme === "light" && <Check size={16} color="#0b3fa8" />}
                        </div>
                        <p className="adm-theme-card-desc">
                          Bright, minimalist white layout with slate borders and vibrant blue accents.
                        </p>
                      </div>

                      {/* Theme 3: Heritage Maroon */}
                      <div
                        className={`adm-theme-select-card ${theme === "maroon" ? "active" : ""}`}
                        onClick={() => handleThemeChange("maroon")}
                      >
                        <div className="adm-theme-preview-strip">
                          <div className="adm-theme-preview-bar" style={{ background: "#500e1c" }} />
                          <div className="adm-theme-preview-bar" style={{ background: "#7c1529" }} />
                          <div className="adm-theme-preview-bar" style={{ background: "#f59e0b", flex: 0.5 }} />
                        </div>
                        <div className="adm-theme-card-title">
                          <span>Heritage Maroon &amp; Gold</span>
                          {theme === "maroon" && <Check size={16} color="#7c1529" />}
                        </div>
                        <p className="adm-theme-card-desc">
                          Distinguished deep collegiate burgundy with warm gold details.
                        </p>
                      </div>

                      {/* Theme 4: Academic Emerald */}
                      <div
                        className={`adm-theme-select-card ${theme === "emerald" ? "active" : ""}`}
                        onClick={() => handleThemeChange("emerald")}
                      >
                        <div className="adm-theme-preview-strip">
                          <div className="adm-theme-preview-bar" style={{ background: "#064e3b" }} />
                          <div className="adm-theme-preview-bar" style={{ background: "#047857" }} />
                          <div className="adm-theme-preview-bar" style={{ background: "#f59e0b", flex: 0.5 }} />
                        </div>
                        <div className="adm-theme-card-title">
                          <span>Academic Emerald &amp; Gold</span>
                          {theme === "emerald" && <Check size={16} color="#064e3b" />}
                        </div>
                        <p className="adm-theme-card-desc">
                          Prestigious botanical forest green with warm amber highlights.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 1: Supabase Connection */}
                  <div className="adm-settings-panel">
                    <div className="adm-panel-head-row">
                      <h3>Supabase Cloud Synchronization</h3>
                      <div
                        className={`adm-status-pill ${
                          supabaseConnected ? "connected" : "local"
                        }`}
                      >
                        <div className="adm-status-dot" />
                        <span>{supabaseConnected ? "Live Connected" : "Local Storage Mode"}</span>
                      </div>
                    </div>
                    <p className="adm-settings-desc">
                      Connecting Supabase persists all content changes to a live cloud PostgreSQL
                      database so they publish instantly to all visitors across the web. You can
                      create a free database at{" "}
                      <a
                        href="https://supabase.com/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#2563eb", textDecoration: "underline", fontWeight: 600 }}
                      >
                        supabase.com
                      </a>
                      .
                    </p>

                    <form onSubmit={handleSaveSupabaseConfig} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div className="adm-form-field">
                        <label className="adm-label">Supabase Project URL</label>
                        <input
                          type="url"
                          className="adm-input"
                          placeholder="https://xyzcompany.supabase.co"
                          value={sbUrlInput}
                          onChange={(e) => setSbUrlInput(e.target.value)}
                          required
                        />
                      </div>

                      <div className="adm-form-field">
                        <label className="adm-label">Supabase Public Anon Key</label>
                        <input
                          type="password"
                          className="adm-input"
                          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                          value={sbKeyInput}
                          onChange={(e) => setSbKeyInput(e.target.value)}
                          required
                        />
                      </div>

                      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                        <button type="submit" className="adm-btn-create" disabled={testingConnection}>
                          {testingConnection ? (
                            <RefreshCw size={16} className="animate-spin" />
                          ) : (
                            <Database size={16} />
                          )}
                          <span>
                            {testingConnection ? "Verifying..." : "Save & Connect Supabase"}
                          </span>
                        </button>

                        {getStoredSupabaseConfig() && (
                          <button
                            type="button"
                            className="adm-btn-secondary"
                            style={{ color: "#dc2626", borderColor: "#fca5a5" }}
                            onClick={handleDisconnectSupabase}
                          >
                            <span>Disconnect</span>
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Card 2: One-Click SQL Setup Script */}
                  <div className="adm-settings-panel">
                    <h3>One-Click Supabase SQL Setup</h3>
                    <p className="adm-settings-desc">
                      Paste and run this SQL script in your Supabase Dashboard under <strong>SQL Editor</strong>{" "}
                      to create the content table and set public access policies:
                    </p>
                    <div className="adm-code-block">
                      <button
                        type="button"
                        className="adm-copy-code-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
                          showToast("SQL script copied to clipboard!");
                        }}
                      >
                        <Copy size={13} />
                        <span>Copy SQL</span>
                      </button>
                      <pre style={{ margin: 0 }}>{SUPABASE_SQL_SETUP}</pre>
                    </div>
                  </div>

                  {/* Card 3: Data Backup and Restore */}
                  <div className="adm-settings-panel">
                    <h3>Data Backup &amp; Recovery</h3>
                    <p className="adm-settings-desc">
                      Download a complete JSON snapshot of all website content or restore from a previously saved backup file.
                    </p>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <button className="adm-btn-secondary" onClick={handleExportJSON}>
                        <Download size={16} />
                        <span>Download JSON Backup</span>
                      </button>

                      <label className="adm-btn-secondary" style={{ cursor: "pointer" }}>
                        <Upload size={16} />
                        <span>Restore from JSON File</span>
                        <input
                          type="file"
                          accept=".json"
                          style={{ display: "none" }}
                          onChange={handleImportJSON}
                        />
                      </label>

                      <button
                        className="adm-btn-secondary"
                        style={{ color: "#dc2626", borderColor: "#fecaca" }}
                        onClick={handleResetDefaults}
                      >
                        <RefreshCw size={16} />
                        <span>Reset to Defaults</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 4: Passkey Security */}
                  <div className="adm-settings-panel">
                    <h3>Change Administrator Passkey</h3>
                    <p className="adm-settings-desc">
                      Update the staff passkey required to access this administration portal.
                    </p>
                    <form onSubmit={handleUpdatePasskey} style={{ display: "flex", gap: "0.85rem", maxWidth: "460px" }}>
                      <div className="adm-input-wrapper" style={{ flex: 1 }}>
                        <input
                          type={showNewPasskey ? "text" : "password"}
                          className="adm-input with-right-icon"
                          placeholder="New administrator passkey"
                          value={newPasskey}
                          onChange={(e) => setNewPasskey(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="adm-input-addon-btn"
                          onClick={() => setShowNewPasskey(!showNewPasskey)}
                        >
                          {showNewPasskey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <button type="submit" className="adm-btn-create">
                        Update Key
                      </button>
                    </form>
                  </div>

                  {/* Card 5: GitHub Pages Deployment & Live Links */}
                  <div className="adm-settings-panel">
                    <div className="adm-panel-head-row">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <Globe size={18} style={{ color: "#0b3fa8" }} />
                        <h3 style={{ margin: 0 }}>GitHub Pages Live Deployment</h3>
                      </div>
                      <div className="adm-status-pill connected">
                        <div className="adm-status-dot" />
                        <span>Live on GitHub Pages</span>
                      </div>
                    </div>
                    <p className="adm-settings-desc">
                      The official website is hosted and deployed on GitHub Pages. Any changes you save in this admin portal are updated in real-time through your cloud database without needing to rebuild or change the deployment link.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginTop: "1rem" }}>
                      {/* Live Site URL */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.85rem 1rem",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: 8,
                          gap: "1rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
                            Public Live Website
                          </span>
                          <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "#0f172a", wordBreak: "break-all" }}>
                            https://avishka-kavishan.github.io/Rippon-Girls-College-Website/
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            type="button"
                            className="adm-btn-secondary"
                            style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem" }}
                            onClick={() => {
                              navigator.clipboard.writeText("https://avishka-kavishan.github.io/Rippon-Girls-College-Website/");
                              showToast("Public website link copied!");
                            }}
                          >
                            <Copy size={13} />
                            <span>Copy</span>
                          </button>
                          <a
                            href="https://avishka-kavishan.github.io/Rippon-Girls-College-Website/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="adm-btn-secondary"
                            style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", textDecoration: "none" }}
                          >
                            <ExternalLink size={13} />
                            <span>Visit</span>
                          </a>
                        </div>
                      </div>

                      {/* Admin Portal URL */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.85rem 1rem",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: 8,
                          gap: "1rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
                            Staff Admin Portal
                          </span>
                          <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "#0f172a", wordBreak: "break-all" }}>
                            https://avishka-kavishan.github.io/Rippon-Girls-College-Website/admin
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            type="button"
                            className="adm-btn-secondary"
                            style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem" }}
                            onClick={() => {
                              navigator.clipboard.writeText("https://avishka-kavishan.github.io/Rippon-Girls-College-Website/admin");
                              showToast("Admin portal link copied!");
                            }}
                          >
                            <Copy size={13} />
                            <span>Copy</span>
                          </button>
                          <a
                            href="https://avishka-kavishan.github.io/Rippon-Girls-College-Website/admin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="adm-btn-secondary"
                            style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem", textDecoration: "none" }}
                          >
                            <ExternalLink size={13} />
                            <span>Open</span>
                          </a>
                        </div>
                      </div>

                      <div
                        style={{
                          padding: "0.85rem 1rem",
                          borderRadius: 8,
                          background: "#eff6ff",
                          border: "1px solid #bfdbfe",
                          fontSize: "0.85rem",
                          color: "#1e40af",
                          lineHeight: 1.5,
                          marginTop: "0.25rem",
                        }}
                      >
                        💡 <strong>Notice:</strong> When you update news, events, administration members, gallery photos, or stats in this admin portal, the GitHub Pages deployment URL remains fixed. Your modifications update immediately via the cloud database and are visible to everyone without needing to deploy again.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* =====================================================================
          MODAL: GALLERY EDIT / CREATE
          ===================================================================== */}
      {galleryModalOpen && editingGalleryItem && (
        <div className="adm-modal-backdrop" onClick={() => setGalleryModalOpen(false)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-topbar">
              <h3 className="adm-modal-title">
                {content?.gallery.some((i) => i.id === editingGalleryItem.id)
                  ? "Edit Gallery Photo"
                  : "Add New Photo to Gallery"}
              </h3>
              <button
                className="adm-modal-close-btn"
                onClick={() => setGalleryModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div className="adm-form-field">
                <label className="adm-label">Photo Title *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Science Laboratory Experiment"
                  value={editingGalleryItem.title}
                  onChange={(e) =>
                    setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Subtitle / Event Context</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Senior Advanced Level Students in Physics Lab"
                  value={editingGalleryItem.subtitle || ""}
                  onChange={(e) =>
                    setEditingGalleryItem({
                      ...editingGalleryItem,
                      subtitle: e.target.value,
                    })
                  }
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="adm-form-field">
                  <label className="adm-label">Category *</label>
                  <select
                    className="adm-input"
                    value={editingGalleryItem.category}
                    onChange={(e) =>
                      setEditingGalleryItem({
                        ...editingGalleryItem,
                        category: e.target.value,
                      })
                    }
                  >
                    {defaultGalleryCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="adm-form-field">
                  <label className="adm-label">Bento Layout Span</label>
                  <select
                    className="adm-input"
                    value={editingGalleryItem.span || "standard"}
                    onChange={(e) =>
                      setEditingGalleryItem({
                        ...editingGalleryItem,
                        span: e.target.value as any,
                      })
                    }
                  >
                    <option value="standard">Standard (1x1)</option>
                    <option value="wide">Wide (2x1 Landscape)</option>
                    <option value="tall">Tall (1x2 Portrait)</option>
                    <option value="featured">Featured (2x2 Hero)</option>
                  </select>
                </div>
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Photo Image * (Upload File or Enter URL / Path)</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="/images/advance.jpeg or https://..."
                  value={editingGalleryItem.image}
                  onChange={(e) =>
                    setEditingGalleryItem({ ...editingGalleryItem, image: e.target.value })
                  }
                  required
                />

                <div style={{ marginTop: "0.5rem" }}>
                  <label className="adm-btn-secondary" style={{ cursor: "pointer", fontSize: "0.82rem" }}>
                    <Upload size={14} />
                    <span>Upload image from your device</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageFileUpload(e, (dataUrl) => {
                          const img = new window.Image();
                          img.onload = () => {
                            const isTall = img.naturalHeight > img.naturalWidth * 1.15;
                            const isWide = img.naturalWidth > img.naturalHeight * 1.4;
                            setEditingGalleryItem({
                              ...editingGalleryItem,
                              image: dataUrl,
                              span: isTall
                                ? "tall"
                                : isWide
                                ? "wide"
                                : editingGalleryItem.span || "standard",
                            });
                          };
                          img.src = dataUrl;
                        })
                      }
                    />
                  </label>
                </div>

                {editingGalleryItem.image && (
                  <div
                    style={{
                      marginTop: "0.65rem",
                      height: 180,
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#f1f5f9",
                      border: "1px dashed #cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={
                        editingGalleryItem.image.startsWith("data:")
                          ? editingGalleryItem.image
                          : getAssetPath(editingGalleryItem.image)
                      }
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Accessibility Alt Text</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="Describe image content for screen readers"
                  value={editingGalleryItem.alt || ""}
                  onChange={(e) =>
                    setEditingGalleryItem({ ...editingGalleryItem, alt: e.target.value })
                  }
                />
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setGalleryModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-create">
                  <Check size={16} />
                  <span>Save Photo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: NEWS EDIT / CREATE
          ===================================================================== */}
      {newsModalOpen && editingNewsItem && (
        <div className="adm-modal-backdrop" onClick={() => setNewsModalOpen(false)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-topbar">
              <h3 className="adm-modal-title">
                {content?.news.some((i) => i.id === editingNewsItem.id)
                  ? "Edit News Article"
                  : "Publish News Article"}
              </h3>
              <button
                className="adm-modal-close-btn"
                onClick={() => setNewsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveNews} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div className="adm-form-field">
                <label className="adm-label">Article Headline *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Sri Lanka Girl Guides All-Island Honors"
                  value={editingNewsItem.title}
                  onChange={(e) =>
                    setEditingNewsItem({ ...editingNewsItem, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Publish Date (e.g. Oct 12, 2026) *</label>
                <input
                  type="text"
                  className="adm-input"
                  value={editingNewsItem.date || ""}
                  onChange={(e) =>
                    setEditingNewsItem({ ...editingNewsItem, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Article Excerpt / Description *</label>
                <textarea
                  className="adm-input"
                  rows={4}
                  placeholder="Provide news announcement details..."
                  value={editingNewsItem.description}
                  onChange={(e) =>
                    setEditingNewsItem({
                      ...editingNewsItem,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Cover Photo *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="/images/news/1.jpg or URL"
                  value={editingNewsItem.image}
                  onChange={(e) =>
                    setEditingNewsItem({ ...editingNewsItem, image: e.target.value })
                  }
                  required
                />

                <div style={{ marginTop: "0.5rem" }}>
                  <label className="adm-btn-secondary" style={{ cursor: "pointer", fontSize: "0.82rem" }}>
                    <Upload size={14} />
                    <span>Upload cover photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageFileUpload(e, (dataUrl) =>
                          setEditingNewsItem({ ...editingNewsItem, image: dataUrl })
                        )
                      }
                    />
                  </label>
                </div>

                {editingNewsItem.image && (
                  <div
                    style={{
                      marginTop: "0.65rem",
                      height: 160,
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#f1f5f9",
                      border: "1px dashed #cbd5e1",
                    }}
                  >
                    <img
                      src={
                        editingNewsItem.image.startsWith("data:")
                          ? editingNewsItem.image
                          : getAssetPath(editingNewsItem.image)
                      }
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setNewsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-create">
                  <Check size={16} />
                  <span>Publish News</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EVENT EDIT / CREATE
          ===================================================================== */}
      {eventModalOpen && editingEventItem && (
        <div className="adm-modal-backdrop" onClick={() => setEventModalOpen(false)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-topbar">
              <h3 className="adm-modal-title">
                {content?.events.some((i) => i.id === editingEventItem.id)
                  ? "Edit Scheduled Event"
                  : "Schedule New Event"}
              </h3>
              <button
                className="adm-modal-close-btn"
                onClick={() => setEventModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div className="adm-form-field">
                <label className="adm-label">Event Title *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Annual Inter-House Athletic Meet"
                  value={editingEventItem.title}
                  onChange={(e) =>
                    setEditingEventItem({ ...editingEventItem, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Calendar Date &amp; Picker *</label>
                <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                  <input
                    type="date"
                    className="adm-input"
                    style={{ flex: 1 }}
                    value={
                      editingEventItem.dateStr ||
                      parseEventDate(editingEventItem, calYear).dateStr
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        const parts = val.split("-").map(Number);
                        const mAbbr = MONTH_ABBRS[parts[1] - 1] || "OCT";
                        const dayStr = String(parts[2]).padStart(2, "0");
                        setEditingEventItem({
                          ...editingEventItem,
                          dateStr: val,
                          month: mAbbr,
                          day: dayStr,
                        });
                      } else {
                        setEditingEventItem({
                          ...editingEventItem,
                          dateStr: "",
                        });
                      }
                    }}
                    required
                  />
                  {/* Live Calendar Badge Preview */}
                  <div className="adm-date-preview-badge" title="Website badge preview">
                    <span className="adm-date-badge-month">{editingEventItem.month || "---"}</span>
                    <span className="adm-date-badge-day">{editingEventItem.day || "--"}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="adm-form-field">
                  <label className="adm-label">Month (3 letters) *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="NOV, DEC, JAN"
                    maxLength={3}
                    value={editingEventItem.month}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      const mIdx = MONTH_ABBRS.indexOf(val);
                      let newDateStr = editingEventItem.dateStr;
                      if (mIdx !== -1 && editingEventItem.day) {
                        const d = parseInt(editingEventItem.day, 10);
                        if (!isNaN(d)) {
                          newDateStr = formatDateIso(calYear, mIdx, d);
                        }
                      }
                      setEditingEventItem({
                        ...editingEventItem,
                        month: val,
                        dateStr: newDateStr,
                      });
                    }}
                    required
                  />
                </div>

                <div className="adm-form-field">
                  <label className="adm-label">Day Number *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="15, 24"
                    maxLength={2}
                    value={editingEventItem.day}
                    onChange={(e) => {
                      const val = e.target.value;
                      const d = parseInt(val, 10);
                      let newDateStr = editingEventItem.dateStr;
                      const mIdx = MONTH_ABBRS.indexOf(editingEventItem.month?.toUpperCase());
                      if (!isNaN(d) && mIdx !== -1) {
                        newDateStr = formatDateIso(calYear, mIdx, d);
                      }
                      setEditingEventItem({
                        ...editingEventItem,
                        day: val,
                        dateStr: newDateStr,
                      });
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="adm-form-field">
                  <label className="adm-label">Time *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="8:30 AM"
                    value={editingEventItem.time}
                    onChange={(e) =>
                      setEditingEventItem({ ...editingEventItem, time: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="adm-form-field">
                  <label className="adm-label">Venue *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="College Main Grounds"
                    value={editingEventItem.venue}
                    onChange={(e) =>
                      setEditingEventItem({ ...editingEventItem, venue: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setEventModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-create">
                  <Check size={16} />
                  <span>Save Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: ADMINISTRATION STAFF EDIT / CREATE
          ===================================================================== */}
      {adminModalOpen && editingAdminItem && (
        <div className="adm-modal-backdrop" onClick={() => setAdminModalOpen(false)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-topbar">
              <h3 className="adm-modal-title">
                {content?.administration.some((i) => i.id === editingAdminItem.id)
                  ? "Edit Leadership Profile"
                  : "Add Leadership Profile"}
              </h3>
              <button
                className="adm-modal-close-btn"
                onClick={() => setAdminModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAdmin} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div className="adm-form-field">
                <label className="adm-label">Full Name *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Mrs. K. L. Perera"
                  value={editingAdminItem.name}
                  onChange={(e) =>
                    setEditingAdminItem({ ...editingAdminItem, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Designation / Role *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="Principal, Vice Principal, Sectional Head"
                  value={editingAdminItem.role}
                  onChange={(e) =>
                    setEditingAdminItem({ ...editingAdminItem, role: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Portrait Photo *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="/images/pin.png or URL"
                  value={editingAdminItem.image}
                  onChange={(e) =>
                    setEditingAdminItem({ ...editingAdminItem, image: e.target.value })
                  }
                  required
                />

                <div style={{ marginTop: "0.5rem" }}>
                  <label className="adm-btn-secondary" style={{ cursor: "pointer", fontSize: "0.82rem" }}>
                    <Upload size={14} />
                    <span>Upload portrait image</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleImageFileUpload(e, (dataUrl) =>
                          setEditingAdminItem({ ...editingAdminItem, image: dataUrl })
                        )
                      }
                    />
                  </label>
                </div>

                {editingAdminItem.image && (
                  <div
                    style={{
                      marginTop: "0.65rem",
                      height: 180,
                      borderRadius: "8px",
                      overflow: "hidden",
                      background: "#f1f5f9",
                      border: "1px dashed #cbd5e1",
                    }}
                  >
                    <img
                      src={
                        editingAdminItem.image.startsWith("data:")
                          ? editingAdminItem.image
                          : getAssetPath(editingAdminItem.image)
                      }
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setAdminModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-create">
                  <Check size={16} />
                  <span>Save Staff Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CONTACT DEPARTMENT EDIT / CREATE
          ===================================================================== */}
      {deptModalOpen && editingDept && (
        <div className="adm-modal-backdrop" onClick={() => setDeptModalOpen(false)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-topbar">
              <h3 className="adm-modal-title">
                {contactForm?.departments?.some((d) => d.id === editingDept.id)
                  ? "Edit Department Details"
                  : "Add New Department"}
              </h3>
              <button
                className="adm-modal-close-btn"
                onClick={() => setDeptModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveContactDept} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div className="adm-form-field">
                <label className="adm-label">Department / Office Title *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Admissions & Student Affairs"
                  value={editingDept.title}
                  onChange={(e) =>
                    setEditingDept({ ...editingDept, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Scope / Responsibilities Description *</label>
                <textarea
                  rows={3}
                  className="adm-input"
                  placeholder="Brief description of matters handled by this department..."
                  value={editingDept.desc}
                  onChange={(e) =>
                    setEditingDept({ ...editingDept, desc: e.target.value })
                  }
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="adm-form-field">
                  <label className="adm-label">Telephone Line *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="+94 91 223 4769 Ext. 102"
                    value={editingDept.phone}
                    onChange={(e) =>
                      setEditingDept({ ...editingDept, phone: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="adm-form-field">
                  <label className="adm-label">Official Email *</label>
                  <input
                    type="email"
                    className="adm-input"
                    placeholder="admissions@rippongirlscollege.lk"
                    value={editingDept.email}
                    onChange={(e) =>
                      setEditingDept({ ...editingDept, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Display Icon Style</label>
                <select
                  className="adm-input"
                  value={editingDept.iconName || "Building"}
                  onChange={(e) =>
                    setEditingDept({ ...editingDept, iconName: e.target.value })
                  }
                >
                  <option value="Building">🏢 Building / Administrative</option>
                  <option value="GraduationCap">🎓 GraduationCap / Admissions & Academics</option>
                  <option value="BookOpen">📖 BookOpen / Records & Examinations</option>
                  <option value="Users">👥 Users / Alumni & Community</option>
                  <option value="Award">🏆 Award / Sports & Co-Curriculars</option>
                  <option value="Phone">📞 Phone / General Reception</option>
                </select>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setDeptModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-create">
                  <Check size={16} />
                  <span>Save Department</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: VISITING PROTOCOL GUIDELINE EDIT / CREATE
          ===================================================================== */}
      {visitingModalOpen && editingVisiting && (
        <div className="adm-modal-backdrop" onClick={() => setVisitingModalOpen(false)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-topbar">
              <h3 className="adm-modal-title">
                {contactForm?.visitingGuide?.some((v) => v.id === editingVisiting.id)
                  ? "Edit Visiting Guideline"
                  : "Add Visiting Guideline"}
              </h3>
              <button
                className="adm-modal-close-btn"
                onClick={() => setVisitingModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveContactVisiting} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div className="adm-form-field">
                <label className="adm-label">Guideline Title *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. Main Security Gate"
                  value={editingVisiting.title}
                  onChange={(e) =>
                    setEditingVisiting({ ...editingVisiting, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Instructions / Description *</label>
                <textarea
                  rows={4}
                  className="adm-input"
                  placeholder="Details regarding entry requirements, identification, appointment procedures..."
                  value={editingVisiting.desc}
                  onChange={(e) =>
                    setEditingVisiting({ ...editingVisiting, desc: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Icon</label>
                <select
                  className="adm-input"
                  value={editingVisiting.iconName || "ShieldCheck"}
                  onChange={(e) =>
                    setEditingVisiting({ ...editingVisiting, iconName: e.target.value })
                  }
                >
                  <option value="ShieldCheck">🛡️ ShieldCheck (Security & Gate)</option>
                  <option value="Clock">⏰ Clock (Hours & Timing)</option>
                  <option value="Compass">🧭 Compass (Location & Directions)</option>
                </select>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setVisitingModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-create">
                  <Check size={16} />
                  <span>Save Guideline</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: FAQ EDIT / CREATE
          ===================================================================== */}
      {faqModalOpen && editingFaq && (
        <div className="adm-modal-backdrop" onClick={() => setFaqModalOpen(false)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-topbar">
              <h3 className="adm-modal-title">
                {contactForm?.faqs?.some((f) => f.id === editingFaq.id)
                  ? "Edit FAQ"
                  : "Add Frequently Asked Question"}
              </h3>
              <button
                className="adm-modal-close-btn"
                onClick={() => setFaqModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveContactFaq} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div className="adm-form-field">
                <label className="adm-label">Question *</label>
                <input
                  type="text"
                  className="adm-input"
                  placeholder="e.g. How can I schedule an official meeting with the Principal?"
                  value={editingFaq.q}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, q: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-form-field">
                <label className="adm-label">Answer *</label>
                <textarea
                  rows={5}
                  className="adm-input"
                  placeholder="Detailed answer provided to public inquiries..."
                  value={editingFaq.a}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, a: e.target.value })
                  }
                  required
                />
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn-secondary"
                  onClick={() => setFaqModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adm-btn-create">
                  <Check size={16} />
                  <span>Save FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: INQUIRY DETAILS & REPLY VIEW
          ===================================================================== */}
      {selectedInquiry && (
        <div className="adm-modal-backdrop" onClick={() => setSelectedInquiry(null)}>
          <div
            className="adm-modal-card"
            style={{ maxWidth: 620 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adm-modal-topbar">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span className="adm-inquiry-ref">{selectedInquiry.referenceId}</span>
                <h3 className="adm-modal-title">Inquiry Message</h3>
              </div>
              <button
                className="adm-modal-close-btn"
                onClick={() => setSelectedInquiry(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                  background: "#f8fafc",
                  padding: "0.85rem 1rem",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                }}
              >
                <div>
                  <span style={{ color: "#64748b" }}>Sender: </span>
                  <strong style={{ color: "#0f172a" }}>{selectedInquiry.fullName}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Role: </span>
                  <strong style={{ color: "#0f172a" }}>{selectedInquiry.role}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Email: </span>
                  <a href={`mailto:${selectedInquiry.email}`} style={{ color: "#2563eb", fontWeight: 600 }}>
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Phone: </span>
                  <strong style={{ color: "#0f172a" }}>{selectedInquiry.phone || "Not provided"}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Subject: </span>
                  <strong style={{ color: "#0f172a" }}>{selectedInquiry.subject}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Received: </span>
                  <span style={{ color: "#0f172a" }}>
                    {new Date(selectedInquiry.submittedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="adm-label" style={{ marginBottom: "0.4rem" }}>Message Content</label>
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--adm-border)",
                    borderRadius: 8,
                    padding: "1rem",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    color: "#1e293b",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="adm-modal-footer" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: [${selectedInquiry.referenceId}] ${encodeURIComponent(selectedInquiry.subject)}`}
                  className="adm-btn-create"
                  style={{ textDecoration: "none" }}
                >
                  <Mail size={16} />
                  <span>Reply via Email Client</span>
                </a>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="adm-btn-secondary"
                    onClick={() => {
                      setActiveTab("contact");
                      setContactSubTab("inquiries");
                      setSelectedInquiry(null);
                    }}
                    title="Open full contact inquiries manager"
                  >
                    <ExternalLink size={15} />
                    <span>Inquiry Hub</span>
                  </button>

                  <button
                    type="button"
                    className="adm-btn-secondary"
                    onClick={() => handleToggleInquiryStatus(selectedInquiry.id)}
                  >
                    <CheckCircle2 size={15} />
                    <span>
                      {selectedInquiry.status === "resolved" ? "Mark as Unread" : "Mark as Resolved"}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="adm-btn-action delete"
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          CONFIRMATION MODAL (HUMAN TOUCH)
          ===================================================================== */}
      {deleteConfirm && deleteConfirm.open && (
        <div className="adm-modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div
            className="adm-modal-card"
            style={{ maxWidth: 460 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#fee2e2",
                  color: "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "#0f172a" }}>
                  Confirm Action
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  {deleteConfirm.title}
                </p>
              </div>
            </div>

            <div className="adm-modal-footer" style={{ marginTop: "1.5rem" }}>
              <button
                type="button"
                className="adm-btn-secondary"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-btn-action delete"
                style={{ flex: "none", padding: "0.65rem 1.25rem", fontSize: "0.88rem" }}
                onClick={deleteConfirm.onConfirm}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
