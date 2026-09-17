import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Heart,
  ChevronRight,
  ExternalLink,
  Award
} from 'lucide-react';
import { SCHOOL_INFO, HOUSES } from '@/data/schoolData';

export default function Footer() {
  return (
    <footer className="bg-[#050e1a] text-slate-300 border-t-2 border-[#d4af37]/40 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: School Identity & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b89327] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#0a192f] rounded-[6px] flex items-center justify-center">
                  <span className="text-[#d4af37] font-serif font-black text-sm">RGC</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  {SCHOOL_INFO.name}
                </h3>
                <p className="text-xs text-[#d4af37] font-medium tracking-wide">
                  Galle, Sri Lanka • Est. 1871
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              &quot;{SCHOOL_INFO.motto}&quot; — {SCHOOL_INFO.mottoMeaning}. Over 150 years of shaping empowered, virtuous, and visionary female leaders.
            </p>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                House System
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {HOUSES.map((h) => (
                  <Link
                    key={h.id}
                    href="/about#houses"
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: h.color }}
                    />
                    {h.name.replace(' House', '')}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#d4af37] pl-2.5">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'About Rippon & History', href: '/about' },
                { name: 'Academic Curricula & Streams', href: '/academics' },
                { name: 'Clubs, Societies & Sports', href: '/student-life' },
                { name: 'Latest News & Events Hub', href: '/news-events' },
                { name: 'Campus Photo Gallery', href: '/gallery' },
                { name: 'Admissions & Scholarships', href: '/admissions' },
                { name: 'Past Pupils\' Association (PPA)', href: '/alumnae' },
                { name: 'School Anthem & Crest', href: '/about#anthem' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5 text-slate-300"
                  >
                    <ChevronRight className="w-3 h-3 text-[#d4af37]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academic Highlights */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#d4af37] pl-2.5">
              Academic Wings
            </h4>
            <p className="text-xs text-slate-400">
              Delivering high-standard bilingual and national curricula from Primary to Advanced Level.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-slate-800">
                <span className="font-semibold text-[#d4af37] block">G.C.E. Advanced Level</span>
                <span className="text-slate-400 text-[11px]">Bio Science, Physical Science, Commerce, Arts & Tech</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-slate-800">
                <span className="font-semibold text-white block">STEAM & Robotics Hub</span>
                <span className="text-slate-400 text-[11px]">Modern Innovation, Coding & AI Education</span>
              </div>
            </div>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-300">
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>National 1AB High-Achieving School</span>
            </div>
          </div>

          {/* Column 4: Contact & Secretariat */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#d4af37] pl-2.5">
              Connect With Us
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{SCHOOL_INFO.phonePrimary}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{SCHOOL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Mon - Fri: 7:30 AM – 2:00 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full py-2 px-3 bg-[#d4af37]/15 border border-[#d4af37]/50 rounded-lg text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a192f] transition-all duration-200"
              >
                Send Direct Inquiry
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            © {new Date().getFullYear()} {SCHOOL_INFO.name}, Galle. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-[#d4af37] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/admissions" className="hover:text-[#d4af37] transition-colors">Admissions Policy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#d4af37] transition-colors">Campus Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
