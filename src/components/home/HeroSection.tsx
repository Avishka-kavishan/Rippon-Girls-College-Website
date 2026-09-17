import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  Shield,
  Award,
  Users,
  Compass
} from 'lucide-react';
import { SCHOOL_INFO } from '@/data/schoolData';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#071324] text-white overflow-hidden py-20 lg:py-28">
      {/* Background Image with Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80"
          alt="Rippon Girls College Campus Heritage"
          className="w-full h-full object-cover object-center opacity-25 scale-105 animate-pulse-subtle"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#0a192f]/85 to-[#071324]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0,transparent_70%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a192f]/90 border border-[#d4af37]/50 shadow-xl backdrop-blur-md mb-6 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs sm:text-sm font-semibold text-[#d4af37] tracking-wider uppercase">
            150+ Years of Academic Brilliance & Noble Character
          </span>
        </div>

        {/* Latin Motto & Translation */}
        <div className="mb-3">
          <p className="font-serif italic text-lg sm:text-2xl text-[#d4af37] font-semibold tracking-wide">
            &ldquo;{SCHOOL_INFO.motto}&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-slate-300 uppercase tracking-widest font-light mt-0.5">
            {SCHOOL_INFO.mottoMeaning}
          </p>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-5xl">
          Empowering Young Women to Conquer{' '}
          <span className="gold-gradient-text">Global Frontiers</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
          Nestled upon Richmond Hill, Galle since 1871, Rippon Girls&apos; College nurtures visionary female leaders through world-class academic disciplines, cutting-edge STEAM innovation, and timeless values.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/admissions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5a823] to-[#d4af37] text-[#0a192f] font-bold text-base shadow-xl shadow-[#d4af37]/20 hover:scale-105 transition-all duration-300"
          >
            <GraduationCap className="w-5 h-5" />
            Admissions & Enrollments
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-slate-700 text-white font-semibold text-base backdrop-blur-md transition-all duration-300"
          >
            Explore 150-Year Heritage
            <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </Link>
        </div>

        {/* Quick Features Highlight Strip */}
        <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
          {[
            { label: 'Founded in 1871', sub: 'Rich Galle Heritage', icon: Shield },
            { label: 'National 1AB School', sub: 'Grades 1 to 13', icon: Award },
            { label: '3,200+ Students', sub: 'Holistic Development', icon: Users },
            { label: 'STEAM & AI Hub', sub: 'Future-Ready Labs', icon: Compass }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0a192f]/80 border border-[#d4af37]/20 rounded-xl p-4 flex flex-col items-center text-center backdrop-blur-md hover:border-[#d4af37]/60 transition-all duration-300"
            >
              <item.icon className="w-6 h-6 text-[#d4af37] mb-2" />
              <span className="text-sm font-bold text-white">{item.label}</span>
              <span className="text-xs text-slate-400 mt-0.5">{item.sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
