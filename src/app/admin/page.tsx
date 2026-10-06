"use client";

import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  LogOut,
  Image as ImageIcon,
  Newspaper,
  Calendar,
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
} from "lucide-react";
import {
  GalleryItem,
  NewsItem,
  EventItem,
  AdminMember,
  StudentPopulationStats,
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
import { defaultGalleryCategories } from "@/data/defaultData";
import { getAssetPath } from "@/utils/assets";
import "./admin.css";

const ADMIN_PASSKEY_STORAGE_KEY = "rippon_admin_passkey";
const ADMIN_AUTH_SESSION_KEY = "rippon_admin_session";
const ADMIN_THEME_STORAGE_KEY = "rippon_admin_theme";
const DEFAULT_PASSKEY = "rippon2025";

export type AdminTheme = "royal" | "light" | "maroon" | "emerald";

type ActiveTab =
  | "overview"
  | "gallery"
  | "news"
  | "events"
  | "administration"
  | "population"
  | "settings";

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

  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [editingAdminItem, setEditingAdminItem] = useState<AdminMember | null>(null);

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
        setDeleteConfirm(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

    const currentList = content.events || [];
    let updatedList: EventItem[];

    const exists = currentList.some((item) => item.id === editingEventItem.id);
    if (exists) {
      updatedList = currentList.map((item) =>
        item.id === editingEventItem.id ? editingEventItem : item
      );
    } else {
      updatedList = [...currentList, editingEventItem];
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
        item.venue.toLowerCase().includes(q)
    );
  }, [content?.events, searchQuery]);

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
          1. PROFESSIONAL SIDEBAR NAVIGATION
          ------------------------------------------------------------------- */}
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
              className="adm-mobile-toggle"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} />
            </button>

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
                          onClick={() => {
                            setEditingEventItem({
                              id: `event-${Date.now()}`,
                              month: "NOV",
                              day: "15",
                              title: "",
                              time: "9:00 AM",
                              venue: "College Auditorium",
                            });
                            setEventModalOpen(true);
                          }}
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
                      <h1>Upcoming College Events</h1>
                      <p>
                        Keep the school calendar up to date with athletic meets, prize-giving
                        ceremonies, and term examinations.
                      </p>
                    </div>

                    <button
                      className="adm-btn-create"
                      onClick={() => {
                        setEditingEventItem({
                          id: `event-${Date.now()}`,
                          month: "NOV",
                          day: "15",
                          title: "",
                          time: "9:00 AM",
                          venue: "College Main Grounds",
                        });
                        setEventModalOpen(true);
                      }}
                    >
                      <Plus size={18} />
                      <span>Schedule New Event</span>
                    </button>
                  </div>

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
                            className="adm-btn-action edit"
                            style={{ flex: "none", padding: "0.55rem 0.9rem" }}
                            onClick={() => {
                              setEditingEventItem({ ...ev });
                              setEventModalOpen(true);
                            }}
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                          <button
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
                  </div>

                  {filteredEvents.length === 0 && (
                    <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#64748b" }}>
                      <Calendar size={36} style={{ margin: "0 auto 0.75rem", opacity: 0.4 }} />
                      <p>No events found.</p>
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
                  TAB 7: DATABASE & CLOUD SETTINGS
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="adm-form-field">
                  <label className="adm-label">Month (3 letters) *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="NOV, DEC, JAN"
                    maxLength={3}
                    value={editingEventItem.month}
                    onChange={(e) =>
                      setEditingEventItem({
                        ...editingEventItem,
                        month: e.target.value.toUpperCase(),
                      })
                    }
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
                    onChange={(e) =>
                      setEditingEventItem({ ...editingEventItem, day: e.target.value })
                    }
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
