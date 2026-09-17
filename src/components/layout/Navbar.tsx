'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  Calendar,
  Image as ImageIcon,
  HeartHandshake,
  Mail,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  {
    name: 'About Rippon',
    href: '/about',
    subLinks: [
      { name: 'Heritage & Timeline', href: '/about#timeline' },
      { name: 'Vision, Mission & Crest', href: '/about#vision' },
      { name: 'School Anthem', href: '/about#anthem' },
      { name: 'House System', href: '/about#houses' },
      { name: 'Administration & Staff', href: '/about#leadership' }
    ]
  },
  { name: 'Academics', href: '/academics' },
  { name: 'Student Life', href: '/student-life' },
  { name: 'News & Events', href: '/news-events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Alumnae (PPA)', href: '/alumnae' },
  { name: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a192f]/95 backdrop-blur-md shadow-xl border-b border-[#d4af37]/30'
          : 'bg-[#0a192f] border-b border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Title */}
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Custom Collegiate Crest Badge */}
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#f5c518] to-[#b89327] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0a192f] rounded-[10px] flex items-center justify-center flex-col">
                <span className="text-[#d4af37] font-serif font-black text-lg leading-tight tracking-wider">
                  RGC
                </span>
                <span className="text-[8px] text-slate-300 uppercase tracking-tighter">
                  1871
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-[#d4af37] transition-colors">
                {SCHOOL_INFO.name}
              </span>
              <span className="text-xs text-[#d4af37] font-medium tracking-wider uppercase">
                Richmond Hill, Galle • Est. 1871
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              if (link.subLinks) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                        isActive
                          ? 'text-[#d4af37] font-semibold bg-white/5'
                          : 'text-slate-200 hover:text-[#d4af37] hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 w-60 py-2 mt-1 bg-[#0a192f] border border-[#d4af37]/30 rounded-xl shadow-2xl backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2 text-xs font-medium text-slate-300 hover:text-[#d4af37] hover:bg-white/10 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#d4af37] font-semibold bg-white/5 shadow-inner'
                      : 'text-slate-200 hover:text-[#d4af37] hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admissions"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold text-[#0a192f] rounded-lg group bg-gradient-to-br from-[#d4af37] to-[#e5a823] group-hover:from-[#f5c518] group-hover:to-[#d4af37] hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all duration-300"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#d4af37] group-hover:bg-[#f5c518] rounded-[6px] flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#0a192f]" />
                Enroll Now
              </span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/admissions"
              className="text-xs bg-[#d4af37] text-[#0a192f] font-bold px-3 py-1.5 rounded-md"
            >
              Enroll
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071324] border-b border-[#d4af37]/30 px-4 pt-2 pb-6 space-y-1 animate-fadeIn">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold'
                      : 'text-slate-200 hover:bg-white/5 hover:text-[#d4af37]'
                  }`}
                >
                  {link.name}
                </Link>
                {link.subLinks && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-black/20 rounded-lg my-1">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-3 py-1.5 text-xs text-slate-300 hover:text-[#d4af37]"
                      >
                        • {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/admissions"
              className="w-full text-center py-2.5 bg-gradient-to-r from-[#d4af37] to-[#e5a823] text-[#0a192f] font-bold rounded-lg shadow"
            >
              Admissions Portal (2026/2027)
            </Link>
            <Link
              href="/contact"
              className="w-full text-center py-2.5 border border-[#d4af37]/40 text-[#d4af37] font-medium rounded-lg hover:bg-white/5"
            >
              Contact School Administration
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
