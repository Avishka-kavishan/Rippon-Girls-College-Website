"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { getAssetPath } from "@/utils/assets";
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
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate server dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomRef = `RGC-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      setSubmissionRef(randomRef);
    }, 750);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
    setIsSubmitted(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const departments = [
    {
      title: "Principal's Office",
      icon: <Building size={20} />,
      desc: "Executive administration, institutional governance, appointments, and official delegations.",
      phone: "+94 91 223 4770",
      email: "principal@rippongirlscollege.lk",
    },
    {
      title: "Admissions & Student Affairs",
      icon: <GraduationCap size={20} />,
      desc: "Grade 1 admissions, mid-year secondary school admissions, and G.C.E. Advanced Level streaming.",
      phone: "+94 91 223 4769 Ext. 102",
      email: "admissions@rippongirlscollege.lk",
    },
    {
      title: "Examinations & Records",
      icon: <BookOpen size={20} />,
      desc: "School leaving certificates, character certificates, G.C.E. O/L and A/L student verification records.",
      phone: "+94 91 223 4769 Ext. 104",
      email: "records@rippongirlscollege.lk",
    },
    {
      title: "Past Pupils' Association (PPA)",
      icon: <Users size={20} />,
      desc: "Alumni network, global chapter reunions, scholarship funds, and school development contributions.",
      phone: "+94 91 223 4769 Ext. 106",
      email: "ppa@rippongirlscollege.lk",
    },
    {
      title: "Sports & Co-Curricular Council",
      icon: <Award size={20} />,
      desc: "Interschool tournaments, athletic council, Western band, Eastern orchestra, and cultural troupes.",
      phone: "+94 91 223 4769 Ext. 108",
      email: "sports@rippongirlscollege.lk",
    },
    {
      title: "General Reception Desk",
      icon: <Phone size={20} />,
      desc: "Public inquiries, campus visits, general front-desk assistance, and visitor gate passes.",
      phone: "+94 91 223 4769",
      email: "ripponbalika@gmail.com",
    },
  ];

  const faqs = [
    {
      q: "What is the procedure for obtaining a School Leaving Certificate?",
      a: "Past pupils or authorized guardians should visit the College Records Office during weekday morning hours (8:30 AM – 1:00 PM). Please bring the student's Admission Number, National Identity Card (NIC), and clearance form. Processing generally takes 3 to 5 working days.",
    },
    {
      q: "How can I schedule an official meeting with the Principal?",
      a: "Appointments with the Principal are scheduled for Tuesdays and Thursdays between 9:00 AM and 11:30 AM. To ensure availability, please submit your request via telephone (+94 91 223 4770) or send an email to principal@rippongirlscollege.lk at least two business days in advance.",
    },
    {
      q: "What are the school session and office working hours?",
      a: "Academic classes operate from 7:30 AM to 1:30 PM, Monday to Friday. The Administrative Secretariat remains open until 3:30 PM on all government school working days. Both academic and administrative offices are closed on weekends and public/mercantile holidays.",
    },
    {
      q: "How do students apply for Advanced Level (A/L) admission after O/Ls?",
      a: "Admission announcements for the G.C.E. Advanced Level streams (Physical Science, Biological Science, Commerce, Arts, and Technology) are published shortly after official O/L results are issued by the Department of Examinations. Application forms can be obtained from the school administrative desk.",
    },
    {
      q: "How can alumni register with the Past Pupils' Association (PPA)?",
      a: "Former students who have completed their education at Rippon Girls' College can join the PPA by registering online or at the PPA Secretariat on campus. For membership forms and upcoming alumni reunions, email ppa@rippongirlscollege.lk.",
    },
  ];

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
          <div className="contact-hero-badge">
            <Compass size={14} />
            <span>Connect &bull; Richmond Hill, Galle</span>
          </div>

          <h1 className="contact-hero-title">Contact Rippon Girls&apos; College</h1>

          <p className="contact-hero-subtitle">
            Have a question or need more information? Get in touch with Rippon Girls' College and connect with us for inquiries, school information, admissions, events, and other matters.
          </p>

          <div className="contact-hero-pills">
            <div className="contact-hero-pill">
              <MapPin size={15} />
              <span>Richmond Hill Street, Galle</span>
            </div>
            <div className="contact-hero-pill">
              <Phone size={15} />
              <span>+94 91 223 4769</span>
            </div>
            <div className="contact-hero-pill">
              <Clock size={15} />
              <span>Mon – Fri: 7:30 AM – 3:30 PM</span>
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
              <h2 className="contact-card-title">Campus Location</h2>
              <p className="contact-card-desc">
                Rippon Girls&apos; College, Richmond Hill Street, Galle 80000, Southern Province, Sri Lanka.
              </p>
              <a href="#map-section" className="contact-card-action">
                <span>View Campus Map</span>
                <ChevronDown size={16} />
              </a>
            </div>

            {/* Card 2: Phone Lines */}
            <div className="contact-card">
              <div className="contact-card-icon-wrap">
                <Phone size={24} />
              </div>
              <h2 className="contact-card-title">Telephone Desk</h2>
              <p className="contact-card-desc">
                <strong>General:</strong> +94 91 223 4769<br />
                <strong>Principal:</strong> +94 91 223 4770
              </p>
              <a href="tel:+94912234769" className="contact-card-action">
                <span>Call Administrative Desk</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Card 3: Email Communication */}
            <div className="contact-card">
              <div className="contact-card-icon-wrap">
                <Mail size={24} />
              </div>
              <h2 className="contact-card-title">Email Inquiries</h2>
              <p className="contact-card-desc">
                <strong>Primary:</strong> ripponbalika@gmail.com<br />
                <strong>Official:</strong> info@rippongirlscollege.lk
              </p>
              <a href="mailto:ripponbalika@gmail.com" className="contact-card-action">
                <span>Send Direct Email</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Card 4: Operating Hours */}
            <div className="contact-card">
              <div className="contact-card-icon-wrap">
                <Clock size={24} />
              </div>
              <h2 className="contact-card-title">School &amp; Office Hours</h2>
              <p className="contact-card-desc">
                <strong>School:</strong> 7:30 AM – 1:30 PM<br />
                <strong>Office:</strong> 7:30 AM – 3:30 PM (Mon–Fri)
              </p>
              <a href="#visiting-guide" className="contact-card-action">
                <span>Visitor Protocol</span>
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
            <span className="contact-badge-label">Send An Inquiry</span>
            <h2 className="contact-main-title">We Are Here to Assist You</h2>
            <p className="contact-main-subtitle">
              Whether you are an alumnus reconnecting, a parent inquiring about admissions,
              or requesting certified school records, please reach out to us below.
            </p>
          </div>

          <div className="contact-grid-layout">
            {/* Left: Contact & Inquiry Form */}
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h3 className="contact-form-heading">Send an Official Message</h3>
                <p className="contact-form-subtext">
                  Fill in your details and our administrative staff will respond to your message promptly.
                </p>
              </div>

              {isSubmitted ? (
                <div className="contact-success-box" role="status" aria-live="polite">
                  <div className="contact-success-icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="contact-success-title">Message Received!</h4>
                  <p className="contact-success-msg">
                    Thank you, <strong>{formData.fullName}</strong>. Your inquiry regarding{" "}
                    <strong>{formData.subject}</strong> has been received by the administrative office. We will respond to{" "}
                    <strong>{formData.email}</strong> shortly.
                  </p>
                  <div className="contact-success-ref">
                    Reference ID: <strong>{submissionRef}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="contact-success-reset-btn"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-row">
                    {/* Full Name */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-name" className="contact-field-label">
                        Full Name <span className="contact-field-required">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="contact-input"
                        placeholder="e.g. Priyanthi Wickramasinghe"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        aria-invalid={!!errors.fullName}
                        required
                      />
                      {errors.fullName && (
                        <span className="contact-field-char-count" style={{ color: "#dc2626" }}>
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-email" className="contact-field-label">
                        Email Address <span className="contact-field-required">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="contact-input"
                        placeholder="e.g. priyanthi@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        aria-invalid={!!errors.email}
                        required
                      />
                      {errors.email && (
                        <span className="contact-field-char-count" style={{ color: "#dc2626" }}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="contact-form-row">
                    {/* Phone Number */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-phone" className="contact-field-label">
                        Contact Phone <span style={{ color: "#9ca3af", fontWeight: 400 }}>(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        className="contact-input"
                        placeholder="e.g. +94 77 123 4567"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    {/* Role / Inquirer Type */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-role" className="contact-field-label">
                        I am a...
                      </label>
                      <select
                        id="contact-role"
                        className="contact-select"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      >
                        <option value="Parent / Guardian">Parent / Guardian</option>
                        <option value="Current Student">Current Student</option>
                        <option value="Alumna (Past Pupil)">Alumna (Past Pupil)</option>
                        <option value="Prospective Student / Parent">Prospective Student / Parent</option>
                        <option value="Academic / Teacher">Academic / Educator</option>
                        <option value="Community Member / Visitor">Community Member / Visitor</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="contact-field-group">
                    <label htmlFor="contact-subject" className="contact-field-label">
                      Subject / Department
                    </label>
                    <select
                      id="contact-subject"
                      className="contact-select"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    >
                      <option value="General Inquiry">General School Inquiry</option>
                      <option value="Admissions & Enrollment">Admissions &amp; Grade Enrollment</option>
                      <option value="Certificates & Transcripts">Leaving Certificates &amp; Transcripts</option>
                      <option value="Principal's Secretariat">Principal&apos;s Secretariat &amp; Appointments</option>
                      <option value="Past Pupils' Association (PPA)">Past Pupils&apos; Association (PPA)</option>
                      <option value="Sports & Extra-Curriculars">Sports, Bands &amp; Extra-Curriculars</option>
                      <option value="School Welfare & Donations">Welfare &amp; School Development Projects</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="contact-field-group">
                    <label htmlFor="contact-message" className="contact-field-label">
                      Message <span className="contact-field-required">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      className="contact-textarea"
                      placeholder="Please share detailed information regarding your inquiry..."
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
                      <span className="contact-field-char-count" style={{ color: "#dc2626", textAlign: "left" }}>
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
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit Official Inquiry</span>
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
                    College Map Location
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rippon+Girls'+College,+Richmond+Hill,+Galle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-map-external-link"
                    title="Open in Google Maps"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div className="contact-map-frame-wrapper">
                  <iframe
                    title="Rippon Girls' College Google Maps Location"
                    className="contact-map-iframe"
                    src="https://maps.google.com/maps?q=Rippon+Girls+College+Richmond+Hill+Galle+Sri+Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>

                <div className="contact-map-details">
                  <span className="contact-map-address">
                    Rippon Girls&apos; College
                  </span>
                  <span>Richmond Hill Street, Galle, Southern Province, Sri Lanka</span>
                  <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                    Postal Code: 80000 &bull; Coordinates: 6.0463&deg; N, 80.2075&deg; E
                  </span>
                </div>
              </div>

              {/* Visiting Guide Card */}
              <div className="contact-visiting-card" id="visiting-guide">
                <h3 className="contact-visiting-title">
                  <ShieldCheck size={20} color="var(--primary-blue)" />
                  Campus Visiting Protocol
                </h3>

                <div className="contact-visiting-list">
                  <div className="contact-visiting-item">
                    <div className="contact-visiting-icon-badge">
                      <ShieldCheck size={16} />
                    </div>
                    <div className="contact-visiting-text-block">
                      <h4 className="contact-visiting-heading">Main Security Gate</h4>
                      <p className="contact-visiting-desc">
                        All visitors must report to the Security Gatehouse at Richmond Hill Road,
                        produce a valid National ID Card (NIC), and receive a visitor pass.
                      </p>
                    </div>
                  </div>

                  <div className="contact-visiting-item">
                    <div className="contact-visiting-icon-badge">
                      <Clock size={16} />
                    </div>
                    <div className="contact-visiting-text-block">
                      <h4 className="contact-visiting-heading">Visiting Hours for Parents</h4>
                      <p className="contact-visiting-desc">
                        Parent-teacher consultations and sectional meetings are conducted after
                        1:30 PM on school days or by scheduled appointment.
                      </p>
                    </div>
                  </div>

                  <div className="contact-visiting-item">
                    <div className="contact-visiting-icon-badge">
                      <Compass size={16} />
                    </div>
                    <div className="contact-visiting-text-block">
                      <h4 className="contact-visiting-heading">How to Reach Us</h4>
                      <p className="contact-visiting-desc">
                        Situated in Richmond Hill, just 2.5 km (8 minutes) from Galle Fort and
                        Galle Central Railway &amp; Bus stations. Readily accessible via local buses and cabs.
                      </p>
                    </div>
                  </div>
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
            <span className="contact-badge-label">Directory</span>
            <h2 className="contact-main-title">Departmental Directory</h2>
            <p className="contact-main-subtitle">
              Reach the designated office directly for faster assistance with admissions,
              academic records, alumni affairs, or sports.
            </p>
          </div>

          <div className="contact-directory-grid">
            {departments.map((dept) => (
              <div key={dept.title} className="contact-dept-card">
                <div className="contact-dept-header">
                  <div className="contact-dept-icon">{dept.icon}</div>
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
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FAQS ACCORDION SECTION
          ========================================================================= */}
      <section className="contact-faq-section" id="faq">
        <div className="contact-faq-container">
          <div className="contact-section-header">
            <span className="contact-badge-label">Common Questions</span>
            <h2 className="contact-main-title">Frequently Asked Questions</h2>
            <p className="contact-main-subtitle">
              Quick answers to frequently asked questions regarding campus protocols, certificates,
              visiting hours, and admissions.
            </p>
          </div>

          <div className="contact-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.q}
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
          <h2 className="contact-cta-title">Need Urgent School Assistance?</h2>
          <p className="contact-cta-sub">
            Our general administrative desk is active during weekday school hours. Feel free to call us directly
            or drop by the Richmond Hill campus.
          </p>
          <div className="contact-cta-buttons">
            <a href="tel:+94912234769" className="contact-cta-btn-primary">
              <Phone size={18} />
              <span>Call General Desk: +94 91 223 4769</span>
            </a>
            <a href="mailto:ripponbalika@gmail.com" className="contact-cta-btn-secondary">
              <Mail size={18} />
              <span>Email: ripponbalika@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
