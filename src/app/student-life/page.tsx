'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Trophy,
  Sparkles,
  Shield,
  Music,
  Compass,
  CheckCircle,
  Clock,
  UserCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import { CLUBS_SOCIETIES, SPORTS_LIST } from '@/data/schoolData';
import SectionHeading from '@/components/shared/SectionHeading';

const CATEGORIES = ['All', 'Academic', 'Technology & Media', 'Cultural & Aesthetic', 'Leadership & Service'];

export default function StudentLifePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredClubs = selectedCategory === 'All'
    ? CLUBS_SOCIETIES
    : CLUBS_SOCIETIES.filter((c) => c.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <section className="relative bg-[#0a192f] text-white py-20 lg:py-24 border-b-2 border-[#d4af37]/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            Vibrant Campus Life
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Student Life & <span className="gold-gradient-text">Co-Curriculars</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Beyond academic rigor, Rippon offers over 25 vibrant student societies, championship sports teams, and leadership guilds that foster character, creativity, and camaraderie.
          </p>
        </div>
      </section>

      {/* Prefects' Guild & Student Leadership */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0a192f] via-[#0e274f] to-[#0a192f] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                Dignity • Duty • Leadership
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                The Senior Prefects&apos; Guild
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The apex student leadership body of Rippon Girls&apos; College. Entrusted with upholding school traditions, maintaining discipline, spearheading major college convocations, and serving as role models of moral excellence and empathy.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  'Head Prefect & Deputies',
                  'Games Captain & House Captains',
                  'Senior Stewards Council'
                ].map((pos, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs font-semibold text-[#d4af37]">
                    ✓ {pos}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="p-6 bg-white/5 border border-[#d4af37]/30 rounded-2xl text-center w-full backdrop-blur-md">
                <Award className="w-10 h-10 text-[#d4af37] mx-auto mb-3" />
                <h4 className="font-serif font-bold text-lg text-white">Annual Investiture</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Badging & Oath of Allegiance ceremony held annually in the presence of distinguished alumni.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Passions & Curiosity"
          title="Clubs & Academic Societies"
          subtitle="Discover your passions in science, media, international service, cultural arts, and public oratory."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0a192f] text-[#d4af37] shadow-md border-2 border-[#d4af37]'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0a192f]">
                    {club.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {club.meetingDay}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#0a192f] group-hover:text-[#b89327] transition-colors mb-2">
                  {club.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {club.description}
                </p>

                {/* Achievements List */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1 mb-4">
                  <span className="text-[10px] uppercase font-bold text-[#b89327] block">
                    Recent Honors
                  </span>
                  {club.achievements.map((ach, i) => (
                    <p key={i} className="text-xs text-slate-700 leading-tight">
                      • {ach}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Teacher In-Charge: <strong>{club.leadTeacher}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sports & Athletics */}
      <section className="py-16 lg:py-24 bg-[#0a192f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            theme="dark"
            badge="Champions on the Field"
            title="Sports & Athletic Excellence"
            subtitle="Fostering physical endurance, discipline, and national-level sportsmanship across various sporting disciplines."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPORTS_LIST.map((sport) => (
              <div
                key={sport.id}
                className="bg-[#0f2444] rounded-3xl border border-[#d4af37]/20 p-6 sm:p-7 shadow-lg hover:border-[#d4af37] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-300 font-mono">
                      {sport.season}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    {sport.name}
                  </h3>

                  <div className="space-y-1.5 pt-2 mb-4">
                    <span className="text-[10px] uppercase font-bold text-[#d4af37] block">
                      Key Highlights
                    </span>
                    {sport.achievements.map((ach, i) => (
                      <p key={i} className="text-xs text-slate-200">
                        ✓ {ach}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                  Head Coach: <strong className="text-white">{sport.coach}</strong>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
