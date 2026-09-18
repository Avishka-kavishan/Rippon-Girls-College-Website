import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-wrapper" id="contact">
      <div className="footer-container">
        {/* Column 1: School Identity & Contact */}
        <div className="footer-col">
          <div className="footer-brand">
            <div className="footer-logo-circle">
              <Image
                src="/images/sample-logo.png"
                alt="Rippon Girl's College Crest"
                width={56}
                height={56}
                className="footer-logo-img"
              />
            </div>
            <div>
              <h3 className="footer-brand-title">Rippon Girl&apos;s College</h3>
              <p className="footer-brand-sub">
                Oldest Girl&apos;s School in Southern Province of Sri Lanka
              </p>
            </div>
          </div>

          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <MapPin size={18} className="footer-contact-icon" />
              <span>Rippon Girls&apos; College, Richmond Hill, Galle, Sri Lanka</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} className="footer-contact-icon" />
              <span>Tel: +94 91 223 4753</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} className="footer-contact-icon" />
              <span>
                Email:{" "}
                <a href="mailto:ripponcollegalk@gmail.com">
                  ripponcollegalk@gmail.com
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li className="footer-link-item">
              <Link href="/">Home</Link>
            </li>
            <li className="footer-link-item">
              <Link href="#about">About</Link>
            </li>
            <li className="footer-link-item">
              <Link href="#academics">Academics</Link>
            </li>
            <li className="footer-link-item">
              <Link href="#gallery">Gallery</Link>
            </li>
            <li className="footer-link-item">
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Follow Us */}
        <div className="footer-col">
          <h4 className="footer-col-title">Follow Us</h4>
          <p className="footer-social-desc">
            Stay connected with Rippon Girls&apos; College through our official social media channels.
          </p>
          <div className="footer-social-icons">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          © 2026 Rippon Girls School, All rights reserved | Developed by Kavishan
        </p>
      </div>
    </footer>
  );
}
