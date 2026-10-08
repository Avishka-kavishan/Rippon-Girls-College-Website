"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-wrapper" id="contact">
      <div className="footer-container">
        {/* Column 1: School Identity & Contact */}
        <div className="footer-col">
          <div className="footer-brand">
            <div className="footer-logo-circle">
              <Image
                src={getAssetPath("/images/sample-logo.png")}
                alt="Rippon Girl's College Crest"
                width={56}
                height={56}
                className="footer-logo-img"
              />
            </div>
            <div>
              <h3 className="footer-brand-title">{t.footer.brandTitle}</h3>
              <p className="footer-brand-sub">{t.footer.brandSubtitle}</p>
            </div>
          </div>

          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <MapPin size={18} className="footer-contact-icon" />
              <span>{t.footer.address}</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="footer-contact-icon" />
              <span>
                {t.footer.phoneLabel}: {t.footer.phone}
              </span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} className="footer-contact-icon" />
              <span>
                {t.footer.emailLabel}:{" "}
                <a href={`mailto:${t.footer.email}`}>{t.footer.email}</a>
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">{t.footer.quickLinks}</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <Link href="/">{t.nav.home}</Link>
            </li>
            <li className="footer-link-item">
              <Link href="/about">{t.nav.about}</Link>
            </li>
            <li className="footer-link-item">
              <Link href="/news">{t.nav.news}</Link>
            </li>
            <li className="footer-link-item">
              <Link href="/gallery">{t.nav.gallery}</Link>
            </li>
            <li className="footer-link-item">
              <Link href="/contact">{t.nav.contact}</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Follow Us */}
        <div className="footer-col">
          <h4 className="footer-col-title">{t.footer.followUs}</h4>
          <p className="footer-social-desc">{t.footer.socialDesc}</p>
          <div className="footer-social-icons">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Facebook"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="YouTube"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          <span>{t.footer.copyright}</span>
          <span className="footer-divider">|</span>
          <span>
            {t.footer.developedBy}{" "}
            <a
              href="https://www.linkedin.com/in/avishka-kavishan-632476282?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-developer-link"
              title="A.K.Rathnaweera LinkedIn Profile"
            >
              {t.footer.developerName}
            </a>
          </span>
          <span className="footer-divider">•</span>
          <Link
            href="/admin"
            className="footer-admin-link"
            title="School Administration Portal"
          >
            🔒 {t.footer.staffAdmin}
          </Link>
        </p>
      </div>
    </footer>
  );
}
