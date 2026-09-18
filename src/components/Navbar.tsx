"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import "./Navbar.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Academics", href: "#academics" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <span className="navbar-title">
              Rippon Girl&apos;s College
            </span>
            <span className="navbar-subtitle">
              Oldest Girl&apos;s School in Southern Province of Sri Lanka
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="navbar-link"
            >
              {link.name}
            </Link>
          ))}
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

      {/* Mobile Dropdown Menu */}
      <div className={`navbar-mobile-menu ${isOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="navbar-mobile-link"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
