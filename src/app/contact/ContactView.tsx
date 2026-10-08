"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Building,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Compass,
  ShieldCheck,
} from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import { getAllContent, onContentChange, submitContactInquiry } from "@/services/contentService";
import {
  defaultContactDetails,
  defaultContactDepartments,
  defaultContactVisitingGuide,
  defaultContactFaqs,
} from "@/data/defaultData";
import { ContactPageDetails } from "@/types/content";
import { useLanguage } from "@/context/LanguageContext";
import "./contact.css";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  role: "Parent / Guardian",
  subject: "General Inquiry",
  message: "",
};

export default function ContactView() {
  const { t, language } = useLanguage();
  const [contactData, setContactData] = useState<ContactPageDetails>(defaultContactDetails);

  // Guarantee all fields are safely populated even if database/cache returns partial data
  const activeContact: ContactPageDetails = {
    ...defaultContactDetails,
    ...(contactData || {}),
  };

  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    let isMounted = true;
    getAllContent().then((data) => {
      if (isMounted && data && data.contact) {
        setContactData({
          ...defaultContactDetails,
          ...data.contact,
        });
      }
    });

    const unsubscribe = onContentChange(() => {
      getAllContent().then((data) => {
        if (isMounted && data && data.contact) {
          setContactData({
            ...defaultContactDetails,
            ...data.contact,
          });
        }
      });
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = t.contact.form.errors.nameRequired;
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errs.email = !formData.email.trim()
        ? t.contact.form.errors.emailRequired
        : t.contact.form.errors.emailInvalid;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = t.contact.form.errors.messageRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitContactInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        subject: formData.subject,
        message: formData.message,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmissionRef(res.referenceId);
    } catch {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const fallbackRef = `RGC-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      setSubmissionRef(fallbackRef);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
    setIsSubmitted(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const renderDeptIcon = (iconName?: string) => {
    switch (iconName) {
      case "Building":
        return <Building size={20} />;
      case "GraduationCap":
        return <GraduationCap size={20} />;
      case "BookOpen":
        return <BookOpen size={20} />;
      case "Users":
        return <Users size={20} />;
      case "Award":
        return <Award size={20} />;
      case "Phone":
      default:
        return <Phone size={20} />;
    }
  };

  const renderVisitingIcon = (iconName?: string) => {
    switch (iconName) {
      case "Clock":
        return <Clock size={16} />;
      case "Compass":
        return <Compass size={16} />;
      case "ShieldCheck":
      default:
        return <ShieldCheck size={16} />;
    }
  };

  const displayHeroTitle =
    language === "en"
      ? activeContact.heroTitle || t.contact.heroTitle
      : t.contact.heroTitle;

  const displayHeroSubtitle =
    language === "en"
      ? activeContact.heroSubtitle || t.contact.heroSubtitle
      : t.contact.heroSubtitle;

  return (
    <div className="contact-page-wrapper">
      {/* =========================================================================
          1. HERO BANNER
          ========================================================================= */}
      <section className="contact-hero-section" id="contact-hero">
        <Image
          src={getAssetPath("/images/Hero_img.jpg")}
          alt="Rippon Girls' College Campus Galle"
          fill
          priority
          className="contact-hero-bg-img"
          sizes="100vw"
        />

        <div className="contact-hero-overlay" />

        <div className="contact-hero-content">
          <h1 className="contact-hero-title">{displayHeroTitle}</h1>

          <p className="contact-hero-subtitle">{displayHeroSubtitle}</p>

          <div className="contact-hero-pills">
            <div className="contact-hero-pill">
              <MapPin size={15} />
              <span>
                {(activeContact.address || "").split(",")[1]?.trim() ||
                  "Richmond Hill Street, Galle"}
              </span>
            </div>
            <div className="contact-hero-pill">
              <Phone size={15} />
              <span>{activeContact.generalPhone}</span>
            </div>
            <div className="contact-hero-pill">
              <Clock size={15} />
              <span>
                {t.contact.quickCards.hoursTitle}: {activeContact.officeHours}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HIGHLIGHT CONTACT CARDS
          ========================================================================= */}
      <section className="contact-cards-section" aria-label="Key Contact Channels">
        <div className="contact-cards-container">
          <div className="contact-cards-grid">
            {/* Card 1: Campus Address */}
            <div className="contact-card">
              <div className="contact-card-icon-wrap">
                <MapPin size={24} />
              </div>
              <h2 className="contact-card-title">
                {t.contact.quickCards.addressTitle}
              </h2>
              <p className="contact-card-desc">
                {language === "en"
                  ? activeContact.address
                  : t.footer.address}
              </p>
              <a href="#map-section" className="contact-card-action">
                <span>{t.contact.quickCards.addressAction}</span>
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Card 2: Phone Lines */}
            <div className="contact-card">
              <div className="contact-card-icon-wrap">
                <Phone size={24} />
              </div>
              <h2 className="contact-card-title">
                {t.contact.quickCards.phoneTitle}
              </h2>
              <p className="contact-card-desc">
                <strong>General:</strong> {activeContact.generalPhone}
                <br />
                <strong>Office:</strong> {activeContact.principalPhone}
              </p>
              <a
                href={`tel:${(activeContact.generalPhone || "").replace(/\s+/g, "")}`}
                className="contact-card-action"
              >
                <span>{activeContact.generalPhone}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Card 3: Email Communication */}
            <div className="contact-card">
              <div className="contact-card-icon-wrap">
                <Mail size={24} />
              </div>
              <h2 className="contact-card-title">
                {t.contact.quickCards.emailTitle}
              </h2>
              <p className="contact-card-desc">
                <strong>Primary:</strong> {activeContact.primaryEmail}
                <br />
                <strong>Official:</strong> {activeContact.officialEmail}
              </p>
              <a
                href={`mailto:${activeContact.primaryEmail}`}
                className="contact-card-action"
              >
                <span>{activeContact.primaryEmail}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Card 4: Operating Hours */}
            <div className="contact-card">
              <div className="contact-card-icon-wrap">
                <Clock size={24} />
              </div>
              <h2 className="contact-card-title">
                {t.contact.quickCards.hoursTitle}
              </h2>
              <p className="contact-card-desc">
                <strong>{language === "si" ? "පාසල් කාලය:" : language === "ta" ? "பாடசாலை:" : "School:"}</strong> {activeContact.schoolHours}
                <br />
                <strong>{language === "si" ? "කාර්යාලය:" : language === "ta" ? "அலுவலகம்:" : "Office:"}</strong> {activeContact.officeHours}
              </p>
              <a href="#visiting-guide" className="contact-card-action">
                <span>{t.contact.visitingTitle}</span>
                <ChevronDown size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN SECTION: INQUIRY FORM & LOCATION / VISITING GUIDE
          ========================================================================= */}
      <section className="contact-main-section" id="inquiry-form">
        <div className="contact-main-container">
          <div className="contact-section-header">
            <span className="contact-badge-label">{t.contact.heroBadge}</span>
            <h2 className="contact-main-title">{t.contact.form.title}</h2>
            <p className="contact-main-subtitle">{t.contact.form.subtitle}</p>
          </div>

          <div className="contact-grid-layout">
            {/* Left: Contact & Inquiry Form */}
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h3 className="contact-form-heading">{t.contact.form.title}</h3>
                <p className="contact-form-subtext">{t.contact.form.subtitle}</p>
              </div>

              {isSubmitted ? (
                <div
                  className="contact-success-box"
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact-success-icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="contact-success-title">
                    {t.contact.form.success.title}
                  </h4>
                  <p className="contact-success-msg">
                    {t.contact.form.success.message}
                  </p>
                  <div className="contact-success-ref">
                    {t.contact.form.success.refLabel}:{" "}
                    <strong>{submissionRef}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="contact-success-reset-btn"
                  >
                    {t.contact.form.success.sendAnother}
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-row">
                    {/* Full Name */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-name" className="contact-field-label">
                        {t.contact.form.nameLabel}{" "}
                        <span className="contact-field-required">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="contact-input"
                        placeholder={t.contact.form.namePlaceholder}
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        aria-invalid={!!errors.fullName}
                        required
                      />
                      {errors.fullName && (
                        <span
                          className="contact-field-char-count"
                          style={{ color: "#dc2626" }}
                        >
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-email" className="contact-field-label">
                        {t.contact.form.emailLabel}{" "}
                        <span className="contact-field-required">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="contact-input"
                        placeholder={t.contact.form.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        aria-invalid={!!errors.email}
                        required
                      />
                      {errors.email && (
                        <span
                          className="contact-field-char-count"
                          style={{ color: "#dc2626" }}
                        >
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="contact-form-row">
                    {/* Phone Number */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-phone" className="contact-field-label">
                        {t.contact.form.phoneLabel}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        className="contact-input"
                        placeholder={t.contact.form.phonePlaceholder}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    {/* Role / Inquirer Type */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-role" className="contact-field-label">
                        {t.contact.form.roleLabel}
                      </label>
                      <select
                        id="contact-role"
                        className="contact-select"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      >
                        <option value="Parent / Guardian">
                          {t.contact.form.roles.parent}
                        </option>
                        <option value="Prospective Student">
                          {t.contact.form.roles.prospective}
                        </option>
                        <option value="Alumna">
                          {t.contact.form.roles.alumna}
                        </option>
                        <option value="Staff">
                          {t.contact.form.roles.staff}
                        </option>
                        <option value="Community / Visitor">
                          {t.contact.form.roles.community}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="contact-field-group">
                    <label htmlFor="contact-subject" className="contact-field-label">
                      {t.contact.form.subjectLabel}
                    </label>
                    <select
                      id="contact-subject"
                      className="contact-select"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      <option value="General Inquiry">
                        {t.contact.form.subjects.general}
                      </option>
                      <option value="Admissions & Enrollment">
                        {t.contact.form.subjects.admissions}
                      </option>
                      <option value="Academic Programs">
                        {t.contact.form.subjects.academic}
                      </option>
                      <option value="Extracurricular & Sports">
                        {t.contact.form.subjects.extracurricular}
                      </option>
                      <option value="Certificates & Transcripts">
                        {t.contact.form.subjects.transcripts}
                      </option>
                      <option value="Other Matters">
                        {t.contact.form.subjects.other}
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="contact-field-group">
                    <label htmlFor="contact-message" className="contact-field-label">
                      {t.contact.form.messageLabel}{" "}
                      <span className="contact-field-required">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      className="contact-textarea"
                      placeholder={t.contact.form.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      maxLength={1200}
                      aria-invalid={!!errors.message}
                      required
                    />
                    <div className="contact-field-char-count">
                      {formData.message.length} / 1200 characters
                    </div>
                    {errors.message && (
                      <span
                        className="contact-field-char-count"
                        style={{ color: "#dc2626", textAlign: "left" }}
                      >
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="contact-submit-spinner" />
                        <span>{t.contact.form.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>{t.contact.form.submitBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Location Map & Visiting Info */}
            <div className="contact-info-col">
              {/* Map Card */}
              <div className="contact-map-card" id="map-section">
                <div className="contact-map-header">
                  <span className="contact-map-heading">
                    <MapPin size={18} color="var(--primary-blue)" />
                    {t.contact.mapTitle}
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rippon+Girls'+College,+Richmond+Hill,+Galle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-external-link"
                    title={t.contact.openMap}
                  >
                    <span>{t.contact.openMap}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div className="contact-map-frame-wrapper">
                  <iframe
                    title="Rippon Girls' College Google Maps Location"
                    className="contact-map-iframe"
                    src={activeContact.mapEmbedUrl}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>

                <div className="contact-map-details">
                  <span className="contact-map-address">
                    {t.nav.brandTitle}
                  </span>
                  <span>
                    {language === "en" ? activeContact.address : t.footer.address}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    {t.contact.postalCodeLabel}: {activeContact.mapPostalCode} &bull;{" "}
                    {t.contact.coordinatesLabel}: {activeContact.mapCoordinates}
                  </span>
                </div>
              </div>

              {/* Visiting Guide Card */}
              <div className="contact-visiting-card" id="visiting-guide">
                <h3 className="contact-visiting-title">
                  <ShieldCheck size={20} color="var(--primary-blue)" />
                  {t.contact.visitingTitle}
                </h3>

                <div className="contact-visiting-list">
                  {(activeContact.visitingGuide || defaultContactVisitingGuide).map(
                    (item) => (
                      <div
                        key={item.id || item.title}
                        className="contact-visiting-item"
                      >
                        <div className="contact-visiting-icon-badge">
                          {renderVisitingIcon(item.iconName)}
                        </div>
                        <div className="contact-visiting-text-block">
                          <h4 className="contact-visiting-heading">{item.title}</h4>
                          <p className="contact-visiting-desc">{item.desc}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. DEPARTMENTAL DIRECTORY
          ========================================================================= */}
      <section className="contact-directory-section" id="departments">
        <div className="contact-directory-container">
          <div className="contact-section-header">
            <span className="contact-badge-label">
              {t.contact.departmentsTitle}
            </span>
            <h2 className="contact-main-title">
              {t.contact.departmentsTitle}
            </h2>
            <p className="contact-main-subtitle">
              {t.contact.departmentsSubtitle}
            </p>
          </div>

          <div className="contact-directory-grid">
            {(activeContact.departments || defaultContactDepartments).map(
              (dept) => (
                <div key={dept.id || dept.title} className="contact-dept-card">
                  <div className="contact-dept-header">
                    <div className="contact-dept-icon">
                      {renderDeptIcon(dept.iconName)}
                    </div>
                    <h3 className="contact-dept-name">{dept.title}</h3>
                  </div>
                  <p className="contact-dept-desc">{dept.desc}</p>
                  <div className="contact-dept-contact-rows">
                    <div className="contact-dept-row">
                      <Phone size={14} />
                      <span>{dept.phone}</span>
                    </div>
                    <div className="contact-dept-row">
                      <Mail size={14} />
                      <a href={`mailto:${dept.email}`}>{dept.email}</a>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FAQS ACCORDION SECTION
          ========================================================================= */}
      <section className="contact-faq-section" id="faq">
        <div className="contact-faq-container">
          <div className="contact-section-header">
            <span className="contact-badge-label">{t.contact.faqTitle}</span>
            <h2 className="contact-main-title">{t.contact.faqTitle}</h2>
            <p className="contact-main-subtitle">{t.contact.faqSubtitle}</p>
          </div>

          <div className="contact-faq-list">
            {(activeContact.faqs || defaultContactFaqs).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id || faq.q}
                  className={`contact-faq-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="contact-faq-question-btn"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="contact-faq-chevron" />
                  </button>
                  {isOpen && (
                    <div className="contact-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CTA ACTION BANNER
          ========================================================================= */}
      <section className="contact-cta-section">
        <div className="contact-cta-container">
          <h2 className="contact-cta-title">
            {language === "si"
              ? "හදිසි පාසල් සහයක් අවශ්‍යද?"
              : language === "ta"
                ? "அவசர பாடசாலை உதவி தேவையா?"
                : "Need Urgent School Assistance?"}
          </h2>
          <p className="contact-cta-sub">
            {language === "si"
              ? "පාසල් වේලාවන් තුළ අපගේ ප්‍රධාන පරිපාලන අංශය සක්‍රීයව පවතී. කෙලින්ම අප අමතන්න හෝ රිච්මන්ඩ් හිල් පරිශ්‍රයට පැමිණෙන්න."
              : language === "ta"
                ? "பாடசாலை நேரங்களில் எங்கள் பிரதான நிர்வாகப் பிரிவு செயல்படுகிறது. நேரடியாக எங்களை அழைக்கவும் அல்லது வளாகத்திற்கு வருகை தரவும்."
                : "Our general administrative desk is active during weekday school hours. Feel free to call us directly or drop by the Richmond Hill campus."}
          </p>
          <div className="contact-cta-buttons">
            <a
              href={`tel:${(activeContact.generalPhone || "").replace(/\s+/g, "")}`}
              className="contact-cta-btn-primary"
            >
              <Phone size={18} />
              <span>
                {language === "si" ? "ප්‍රධාන අංකය:" : language === "ta" ? "பொது எண்:" : "Call General Desk:"}{" "}
                {activeContact.generalPhone}
              </span>
            </a>
            <a
              href={`mailto:${activeContact.primaryEmail}`}
              className="contact-cta-btn-secondary"
            >
              <Mail size={18} />
              <span>
                {t.footer.emailLabel}: {activeContact.primaryEmail}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
