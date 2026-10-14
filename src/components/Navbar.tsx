"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import { useLanguage } from "@/context/LanguageContext";
import "./Navbar.css";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "news", href: "/news" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  // Hide the public website navbar on admin interface routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand identity: Logo & Title */}
        <Link href="/" className="navbar-brand">
          <div className="navbar-logo-circle">
            <Image
              src={getAssetPath("/images/sample-logo.png")}
              alt="Rippon Girl's College Logo"
              width={64}
              height={64}
              className="navbar-logo-img"
              priority
            />
          </div>

          <div className="navbar-title-group">
            <span className="navbar-title">{t.nav.brandTitle}</span>
            <span className="navbar-subtitle">{t.nav.brandSubtitle}</span>
          </div>
        </Link>

        {/* Right Section: Desktop Navigation & Mobile Toggle */}
        <div className="navbar-right-group">
          {/* Desktop Navigation Links */}
          <nav className="navbar-links" aria-label="Main Navigation">
            {navItems.map((item) => {
              const label = t.nav[item.key];
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`navbar-link ${isActive ? "active" : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="navbar-mobile-toggle"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`navbar-mobile-menu ${isOpen ? "open" : ""}`}>
        {/* Navigation Links */}
        <div className="navbar-mobile-links">
          {navItems.map((item) => {
            const label = t.nav[item.key];
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`navbar-mobile-link ${isActive ? "active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

