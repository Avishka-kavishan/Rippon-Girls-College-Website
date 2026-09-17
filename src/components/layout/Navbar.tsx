'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news-events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled
          ? 'shadow-sm border-b border-slate-200/90 bg-white/95 backdrop-blur-md'
          : 'border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Title */}
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Collegiate Shield Badge */}
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a192f] via-[#152a4e] to-[#0a192f] p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300 border border-[#d4af37]">
              <div className="w-full h-full bg-[#0a192f] rounded-[10px] flex items-center justify-center flex-col relative overflow-hidden">
                <span className="text-[#d4af37] font-heading font-black text-lg leading-none tracking-wider">
                  RGC
                </span>
                <span className="text-[7px] text-slate-300 font-semibold uppercase tracking-widest mt-0.5">
                  1871
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold text-[#0a192f] tracking-tight group-hover:text-[#b89327] transition-colors leading-tight">
                Rippon Girl&apos;s College
              </span>
              <span className="text-[11px] sm:text-xs text-slate-600 font-medium tracking-tight mt-0.5">
                Oldest Girl&apos;s School in Southern Province of Sri Lanka
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-heading text-sm font-medium transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#0a192f] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0a192f]'
                      : 'text-slate-600 hover:text-[#0a192f]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0a192f] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-heading text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-100 text-[#0a192f] font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0a192f]'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
