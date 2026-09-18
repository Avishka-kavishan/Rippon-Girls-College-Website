"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "News", href: "#news" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#cecece] text-black shadow-sm sticky top-0 z-50 border-b border-neutral-400/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand identity: Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center p-0.5 border border-neutral-300">
            <Image
              src="/images/sample-logo.png"
              alt="Rippon Girl's College Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center text-left select-none">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950 font-sans leading-snug">
              Rippon Girl&apos;s College
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-800 font-medium tracking-normal leading-none mt-0.5">
              Oldest Girl&apos;s School in Southern Province of Sri Lanka
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base lg:text-[17px] font-medium text-neutral-900 hover:text-black transition-colors duration-150 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-neutral-900 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-neutral-900 hover:bg-neutral-400/30 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-700"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#c5c5c5] border-t border-neutral-400/50 px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-300 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
