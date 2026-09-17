'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, X, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { URGENT_NOTICES } from '@/data/eventsData';
import './NoticeBar.css';

export default function NoticeBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !URGENT_NOTICES || URGENT_NOTICES.length === 0) return null;

  const currentNotice = URGENT_NOTICES[0];

  return (
    <div className="bg-[#061224] text-slate-200 border-b border-[#d4af37]/30 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Contact Snippets (Desktop) */}
        <div className="hidden lg:flex items-center gap-5 text-slate-300 font-medium">
          <span className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            Richmond Hill, Galle
          </span>
          <span className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            +94 91 223 4567
          </span>
          <span className="flex items-center gap-1.5 hover:text-[#d4af37] transition-colors">
            <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
            info@rippongirlscollege.lk
          </span>
        </div>

        {/* Notice Alert */}
        <div className="flex items-center gap-2 flex-1 md:justify-end">
          <span className="inline-flex items-center gap-1 bg-[#d4af37] text-[#0a192f] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
            <Bell className="w-3 h-3" />
            Announcement
          </span>
          <p className="text-slate-200 truncate max-w-md sm:max-w-xl text-xs">
            {currentNotice.title}
          </p>
          <Link
            href={currentNotice.link || '/admissions'}
            className="inline-flex items-center gap-1 text-[#d4af37] hover:text-amber-300 font-semibold hover:underline ml-1 whitespace-nowrap"
          >
            Details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          aria-label="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
