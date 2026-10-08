"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/locales/types";
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
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t, languages } = useLanguage();

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide the public website navbar on admin interface routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const currentLangObj =
    languages.find((l) => l.code === language) || languages[0];

  const handleSelectLang = (code: Language) => {
    setLanguage(code);
    setLangMenuOpen(false);
  };

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

        {/* Right Section: Desktop Navigation & Language Switcher */}
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

          {/* Language Selector Dropdown (Desktop) */}
          <div className="navbar-lang-wrapper" ref={langDropdownRef}>
            <button
              type="button"
              className={`navbar-lang-btn ${langMenuOpen ? "active" : ""}`}
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
              aria-haspopup="true"
            >
              <Globe size={18} className="navbar-lang-icon" />
              <span className="navbar-lang-name">{currentLangObj.nativeName}</span>
              <ChevronDown
                size={14}
                className={`navbar-lang-chevron ${langMenuOpen ? "rotate" : ""}`}
              />
            </button>

            {langMenuOpen && (
              <div className="navbar-lang-menu" role="menu">
                {languages.map((langOption) => {
                  const isSelected = language === langOption.code;
                  return (
                    <button
                      key={langOption.code}
                      type="button"
                      role="menuitem"
                      className={`navbar-lang-option ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectLang(langOption.code)}
                    >
                      <span className="lang-option-native">
                        {langOption.nativeName}
                      </span>
                      <span className="lang-option-english">
                        ({langOption.name})
                      </span>
                      {isSelected && (
                        <Check size={16} className="lang-check-icon" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

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

        {/* Mobile Language Switcher Section */}
        <div className="navbar-mobile-lang-box">
          <div className="navbar-mobile-lang-title">
            <Globe size={16} />
            <span>{t.nav.switchLanguage}</span>
          </div>
          <div className="navbar-mobile-lang-pills">
            {languages.map((langOption) => {
              const isSelected = language === langOption.code;
              return (
                <button
                  key={langOption.code}
                  type="button"
                  className={`navbar-mobile-lang-pill ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    handleSelectLang(langOption.code);
                    setIsOpen(false);
                  }}
                >
                  <span className="mobile-pill-native">
                    {langOption.nativeName}
                  </span>
                  <span className="mobile-pill-short">
                    {langOption.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
